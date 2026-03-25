"use client";

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { MapPin } from "lucide-react";
import AnimateOnScroll from './AnimateOnScroll';
import ProjectDetailModal from './ProjectDetailModal';
import { API_BASE_URL, buildApiUrl } from "@/utils/config";
import { Project as ProjectType } from '@/types/project';

interface Project {
  id?: number;
  uniqueKey: string;
  modalId: number;
  image: string | null;
  name: string;
  type: string;
  location: string;
  locationLink?: string;
  map3dIframe?: string;
}

const FALLBACK_IMAGE = "/projects_photo/Abbott Canola Work.png";

const encodePathSegments = (path: string) =>
  path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

const getProjectImageSrc = (project: Project): string => {
  const rawImage = typeof project.image === "string" ? project.image.trim() : "";

  if (!rawImage) {
    return FALLBACK_IMAGE;
  }

  if (rawImage.startsWith("http://") || rawImage.startsWith("https://")) {
    return encodeURI(rawImage);
  }

  if (rawImage.startsWith("/projects_photo/")) {
    const localPath = rawImage.replace("/projects_photo/", "");
    return `/projects_photo/${encodePathSegments(localPath)}`;
  }

  const isApiProject = typeof project.id === "number" && project.id > 0;
  if (isApiProject) {
    const normalizedPath = rawImage.startsWith("/") ? rawImage : `/${rawImage}`;
    return `${API_BASE_URL}${encodeURI(normalizedPath)}`;
  }

  return `/projects_photo/${encodePathSegments(rawImage)}`;
};

const isRemoteImage = (src: string) => src.startsWith("http://") || src.startsWith("https://");

const ProjectCard = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProjectClick = (project: Project) => {
      setSelectedProject({
        id: project.modalId,
        name: project.name,
        type: project.type,
        location: project.location,
        locationLink: project.locationLink,
        map3dIframe: project.map3dIframe,
        image: project.image || undefined,
      });
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedProject(null);
    };

    // Hardcoded existing projects
    const existingProjects = [
      {
        image: "Abbott Crane Foundation Work.jpg",
        name: "Abbott Crane Foundation Steel Binding Work",
        type: "Industrial Project",
        location: "Abbott, Jhagadia, Gujarat",
      },
      {
        image: "Abbott Crane Foundation.jpg",
        name: "Abbott Crane Foundation Concrete Work",
        type: "Industrial Project",
        location: "Abbott, Jhagadia, Gujarat",
      },
      {
        image: "Abbott Slab Work.JPG",
        name: "Abbott Canola Slab Work",
        type: "Industrial Project",
        location: "Abbott, Jhagadia, Gujarat",
      },
      {
        image: "Abbott Canola Work.png",
        name: "Abbott Canola Final Work",
        type: "Industrial Project",
        location: "Abbott, Jhagadia, Gujarat",
      },
      {
        image: "Birla Cellulose Slab Casting Work.jpg",
        name: "Birla Cellulose Slab Casting work",
        type: "Industrial Project",
        location: "Kharach, Gujarat",
      },
      {
        image: "Birla Cellulose.jpg",
        name: "Birla Cellulose Canteen work",
        type: "Industrial Project",
        location: "Kharach, Gujarat",
      },
      {
        image: "Deramic Painting work.jpg",
        name: "Deramic Admin Building Painting work",
        type: "Industrial Project",
        location: "Dahej, Gujarat",
      },
      {
        image: "Elantas RCC Road work.jpg",
        name: "Elantas Back RCC Road work",
        type: "Industrial Project",
        location: "Ankleshwar, Gujarat",
      },
      {
        image: "Elantas Back ETP Work.jpg",
        name: "Elantas Back ETP Final work",
        type: "Industrial Project",
        location: "Ankleshwar, Gujarat",
      },
      {
        image: "Elantas Slab Work.JPG",
        name: "Elantas Back Slab Shuttering and Steel work",
        type: "Industrial Project",
        location: "Ankleshwar, Gujarat",
      },
      {
        image: "ETP & MEE.jpg",
        name: "ETP & MEE",
        type: "Industrial Project",
        location: "Dahej, Gujarat",
      },
      {
        image: "Foundation Bolt Fixing at Reliance.jpg",
        name: "Scrubber Foundation Bolt Fixing at Reliance",
        type: "Industrial Project",
        location: "Reliance, Dahej, Gujarat",
      },
      {
        image: "Godrej Road Work.jpg",
        name: "Godrej Bitumen Road work",
        type: "Industrial Project",
        location: "Dahej, Gujarat",
      },
      {
        image: "Lab Building.jpg",
        name: "Lab Building",
        type: "Industrial Project",
        location: "Dahej, Gujarat",
      },
      {
        image: "MG Motors Precast Drain Work.jpg",
        name: "MG Motors Precast Drain work",
        type: "Industrial Project",
        location: "Halol, Gujarat",
      },
      {
        image: "Nerolac ETP Work.jpg",
        name: "Nerolac ETP work",
        type: "Industrial Project",
        location: "Vilayat, Gujarat",
      },
      {
        image: "Reliance scrubber foundation.jpg",
        name: "Reliance Scrubber Foundation Concrete work",
        type: "Industrial Project",
        location: "Reliance, Dahej, Gujarat",
      },
      {
        image: "Scaffolding Training.jpg",
        name: "Scaffolding Training",
        type: "Industrial Project",
        location: "Birla Cellulose, Kharach, Gujarat",
      },
      {
        image: "DM N pit Raft casting.jpeg",
        name: "DM N pit Raft casting",
        type: "Industrial Project",
        location: "Reliance, Dahej, Gujarat",
      },
      {
        image: "DM plant work pooja.jpeg",
        name: "DM plant work pooja",
        type: "Industrial Project",
        location: "Reliance, Dahej, Gujarat",
      },
      {
        image: "Utility Building.jpeg",
        name: "Utility Building",
        type: "Industrial Project",
        location: "Vital Synthesis Company, Dahej, Gujarat",
      },
      {
        image: "Bullet.jpeg",
        name: "Bullet Foundation Work",
        type: "Industrial Project",
        location: "Reliance VMD, Vadodara, Gujarat",
      },
      {
        image: "N-pit_casting_Wall.jpeg",
        name: "N Pit wall casting",
        type: "Industrial Project",
        location: "Reliance, Dahej, Gujarat",
      },
      {
        image: "CA_flacker.jpeg",
        name: "CA flacker Ware house Renovation work",
        type: "Renovation Project",
        location: "Vital Synthesis Company, Dahej, Gujarat",
      },
      {
        image: "Clarification_Tank_20mt_Dia.jpeg",
        name: "Clarification Tank 20mt Dia at Reliance VMD Baroda",
        type: "Industrial Project",
        location: "Reliance VMD, Vadodara, Gujarat",
      },
      {
        image: "Vital_Synthesis_Plant_Building.jpeg",
        name: "Vital Synthesis Plant Building work",
        type: "Industrial Project",
        location: "Dahej, Gujarat",
      },
      {
        image: "Vital_Synthesis_Road_work.jpeg",
        name: "Vital Synthesis Road work",
        type: "Industrial Project",
        location: "Vital, Dahej, Gujarat",
      },
      {
        image: "Vital_Road,Building,Compound_wall.jpeg",
        name: "Vital Synthesis Road work, Plant Building work, Compound wall work",
        type: "Industrial Project",
        location: "Vital, Dahej, Gujarat",
      },
      {
        image: "Plate_load_Test_Checking.jpeg",
        name: "Plate Load Test Checking of Reliance client ",
        type: "Industrial Project",
        location: "Reliance, Dahej, Gujarat",
      },
    ];

    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const res = await fetch(buildApiUrl("/api/projects"));
          const result = await res.json();

          if (!res.ok) {
            throw new Error(result.message || "Failed to fetch projects");
          }

          const apiProjects = result.data || [];

          const normalizedExistingProjects: Project[] = existingProjects.map((project, index) => ({
            ...project,
            uniqueKey: `local-${project.name}-${project.location}-${index}`,
            modalId: -(index + 1),
            image: project.image || null,
          }));
          
          // Merge API projects with existing hardcoded projects
          const mergedProjects: Project[] = [
            ...apiProjects.map((p: Project & { id: number }) => ({
              id: p.id,
              uniqueKey: `api-${p.id}`,
              modalId: p.id,
              image: p.image || null, // Keep null if no image
              name: p.name,
              type: p.type,
              location: p.location,
              locationLink: p.locationLink, // Include location link from API
              map3dIframe: p.map3dIframe,
            })),
            ...normalizedExistingProjects
          ];
          
          setProjects(mergedProjects);
        } catch (error) {
          console.error("Failed to fetch projects:", error);
          // If API fails, show existing projects
          const normalizedExistingProjects: Project[] = existingProjects.map((project, index) => ({
            ...project,
            uniqueKey: `local-${project.name}-${project.location}-${index}`,
            modalId: -(index + 1),
            image: project.image || null,
          }));
          setProjects(normalizedExistingProjects);
        } finally {
          setLoading(false);
        }
      };

      fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
      return (
        <section className="grid grid-cols-1 gap-8 px-4 py-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="text-center col-span-full text-gray-500">
            Loading projects...
          </div>
        </section>
      );
    }

  return (
    <>
      <section className="grid grid-cols-1 gap-8 px-4 py-10 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((item, index) => {
          const imageSrc = getProjectImageSrc(item);
          const isRemote = isRemoteImage(imageSrc);

          return (
          <AnimateOnScroll direction="up" delay={(index % 3) * 0.2} key={item.uniqueKey}>
            <div 
              className="relative shadow-xl bg-white border-[1] border-gray-400 hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden cursor-pointer flex flex-col h-full"
              onClick={() => handleProjectClick(item)}
            >
              {/* Top Section: Always show uploaded/linked image */}
              <div className="w-full h-64 overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={`${item.name} - ${item.type} construction project by Shubh Construction`}
                  width={600}
                  height={250}
                  className="object-cover w-full h-full cursor-pointer hover:opacity-90 transition-opacity"
                  unoptimized={isRemote}
                />
              </div>

              {/* Bottom Section: Project Info */}
              <div className="p-4 space-y-3 grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">
                    {item.name}
                  </h3>
                  <div className="flex items-start gap-2">
                    <MapPin size={18} color="red" className="shrink-0 mt-0.5" />
                    {item.locationLink ? (
                      <a
                        href={item.locationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-blue-600 hover:text-blue-800 text-xs underline cursor-pointer line-clamp-2"
                      >
                        {item.location}
                      </a>
                    ) : (
                      <p className="text-gray-600 text-xs line-clamp-2">{item.location}</p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProjectClick(item);
                  }}
                  className="w-full bg-red-600 text-white text-xs py-2 rounded hover:bg-red-700 transition-colors font-medium"
                >
                  View Details
                </button>
              </div>

              {/* Badge */}
              <span className="absolute text-white text-xs bg-red-700 rounded-full px-2 py-1 top-3 right-3">
                {item.type}
              </span>
            </div>
          </AnimateOnScroll>
          );
        })}
      </section>

      {/* Project Detail Modal */}
      {isModalOpen && selectedProject && (
        <ProjectDetailModal 
          key={`modal-${selectedProject.id}`}
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default ProjectCard