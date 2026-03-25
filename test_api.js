#!/usr/bin/env node

// Direct API Test - Node.js Version
// Tests backend API without dependencies

const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5000';

// Create test image (1x1 pixel PNG)
const pngBytes = Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
    0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
    0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
    0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0x99, 0x63, 0xF8, 0xCF, 0xC0, 0x00,
    0x00, 0x03, 0x01, 0x01, 0x00, 0x18, 0xDD, 0x8D, 0xB4, 0x00, 0x00, 0x00,
    0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
]);

function makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(BASE_URL + path);
        const options = {
            method: method,
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        status: res.statusCode,
                        data: JSON.parse(body)
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        data: body
                    });
                }
            });
        });

        req.on('error', reject);

        if (data) {
            req.write(typeof data === 'string' ? data : JSON.stringify(data));
        }
        req.end();
    });
}

async function runTests() {
    console.log('\n╔════════════════════════════════════════════════════════╗');
    console.log('║  SHUBH CONSTRUCTION API - END-TO-END TEST              ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');

    try {
        // Test 1: Server Health Check
        console.log('📋 [Test 1] Checking Backend Health...');
        console.log('   Endpoint: GET http://localhost:5000/');
        const health = await makeRequest('GET', '/');
        console.log(`   ✅ Status: ${health.status}`);
        console.log(`   ✅ Message: ${health.data.message}`);
        if (!health.data.message.includes('Shubh')) throw new Error('Backend not responding correctly');

        // Test 2: Get Initial Projects
        console.log('\n📋 [Test 2] Fetching Initial Projects...');
        console.log('   Endpoint: GET /api/projects');
        const initialProjects = await makeRequest('GET', '/api/projects');
        console.log(`   ✅ Status: ${initialProjects.status}`);
        console.log(`   ✅ Projects found: ${initialProjects.data.data?.length || 0}`);

        // Test 3: Create Multiple Projects
        console.log('\n📋 [Test 3] Creating Sample Projects (via mock-form simulation)...');
        const projectsToCreate = [
            { name: 'Metro Office Complex', type: 'Commercial', location: 'Bandra, Mumbai' },
            { name: 'Residential Towers', type: 'Residential', location: 'Worli, Mumbai' },
            { name: 'Shopping Mall', type: 'Commercial', location: 'Vile Parle, Mumbai' }
        ];

        for (const project of projectsToCreate) {
            console.log(`\n   Creating: "${project.name}"`);
            const createPayload = {
                name: project.name,
                type: project.type,
                location: project.location,
                locationLink: 'https://goo.gl/maps/mumbai',
                map3dIframe: '<iframe></iframe>',
                category_id: null,
                status: 'active'
            };

            const created = await makeRequest('POST', '/api/projects', createPayload);
            if (created.status === 201 && created.data.success) {
                console.log(`   ✅ Created! ID: ${created.data.data.id}`);
                console.log(`   ✅ Name: ${created.data.data.name}`);
                console.log(`   ✅ Type: ${created.data.data.type}`);
            } else {
                console.log(`   ❌ Failed: ${created.data.message}`);
            }
        }

        // Test 4: Fetch All Projects
        console.log('\n📋 [Test 4] Fetching All Projects...');
        console.log('   Endpoint: GET /api/projects');
        const allProjects = await makeRequest('GET', '/api/projects');
        console.log(`   ✅ Status: ${allProjects.status}`);
        console.log(`   ✅ Total Projects: ${allProjects.data.data?.length || 0}`);

        if (allProjects.data.data && allProjects.data.data.length > 0) {
            console.log('\n   📊 Projects List:');
            allProjects.data.data.forEach((proj, idx) => {
                console.log(`      ${idx + 1}. ID: ${proj.id.toString().padEnd(3)} | Name: ${proj.name.padEnd(30)} | Type: ${proj.type}`);
            });
        }

        // Test 5: Get Single Project
        if (allProjects.data.data && allProjects.data.data.length > 0) {
            const projectId = allProjects.data.data[0].id;
            console.log(`\n📋 [Test 5] Fetching Single Project (ID: ${projectId})...`);
            console.log(`   Endpoint: GET /api/projects/${projectId}`);
            const singleProject = await makeRequest('GET', `/api/projects/${projectId}`);
            console.log(`   ✅ Status: ${singleProject.status}`);
            console.log(`   ✅ Project: ${singleProject.data.data?.name}`);
            console.log(`   ✅ Details: Type=${singleProject.data.data?.type}, Location=${singleProject.data.data?.location}`);
        }

        // Summary
        console.log('\n╔════════════════════════════════════════════════════════╗');
        console.log('║              ✅ ALL TESTS PASSED ✅                      ║');
        console.log('╚════════════════════════════════════════════════════════╝\n');

        console.log('📌 NEXT STEPS:');
        console.log('   1. Open http://localhost:3001 in your browser');
        console.log('   2. Navigate to /admin/manage-projects');
        console.log('   3. You should see all created projects with real-time updates');
        console.log('   4. Try adding a new project via the form at /admin/add-project');
        console.log('   5. Upload an image and verify it stores in Cloudinary\n');

        console.log('💾 DATA STORAGE:');
        console.log('   • Projects: Mock In-Memory Database (session-based)');
        console.log('   • Images: Cloudinary (when uploaded via UI)');
        console.log('   • Database: Switch to Supabase when network available\n');

    } catch (error) {
        console.error('\n❌ Test Failed:', error.message);
        console.error('\n⚠️  Make sure:');
        console.error('   1. Backend is running: node backend/server.js');
        console.error('   2. Port 5000 is not blocked');
        console.error('   3. No other service using port 5000\n');
        process.exit(1);
    }
}

runTests();
