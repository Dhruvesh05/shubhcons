"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, MapPin, Calendar } from "lucide-react";
import { API_BASE_URL, buildApiUrl } from "@/utils/config";
import { Project, ProjectUpdate } from "@/types/project";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
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

const extractIframeSrc = (value?: string): string => {
  if (!value) return "";

  const trimmed = value.trim();
  if (!trimmed) return "";

  const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
  if (srcMatch?.[1]) {
    return srcMatch[1];
  }

  return /^https?:\/\//i.test(trimmed) ? trimmed : "";
};

export default function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const imageSrc = project ? getProjectImageSrc(project) : FALLBACK_IMAGE;
  const isRemoteProjectImage = isRemoteImage(imageSrc);
  const map3dEmbedSrc = extractIframeSrc(project?.map3dIframe);

  useEffect(() => {
    if (isOpen) {
      setShowMap(false);
    }
  }, [isOpen, project?.id]);

  const fetchUpdates = async () => {
    if (!project?.id || project.id <= 0) return;
    
    setLoading(true);
    try {
      const response = await fetch(buildApiUrl(`/api/projects/${project.id}/updates`));
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch updates");
      }
      
      setUpdates(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error("Failed to fetch updates:", error);
      setUpdates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && project?.id && project.id > 0) {
      fetchUpdates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, project?.id]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} className="text-gray-700" />
        </button>

        {/* Project Image */}
        <div className="relative h-64 sm:h-80 w-full">
          <Image
            src={imageSrc}
            alt={project.name}
            fill
            className="object-cover"
            unoptimized={isRemoteProjectImage}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block bg-red-600 text-white text-sm px-3 py-1 rounded-full mb-2">
              {project.type}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {project.name}
            </h2>
          </div>
        </div>

        {/* 2-Column Layout: Project Details + 3D Map */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            
            {/* LEFT COLUMN: Project Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Information</h3>
                
                {/* Location */}
                <div className="flex items-start gap-2">
                  <MapPin size={20} className="text-red-600 shrink-0 mt-1" />
                  <div>
                    {project.locationLink ? (
                      <a
                        href={project.locationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {project.location}
                      </a>
                    ) : (
                      <p className="text-gray-700">{project.location}</p>
                    )}
                  </div>
                </div>

                {/* Map Instructions */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900 font-medium mb-1">3D Map Controls:</p>
                  <ul className="text-xs text-blue-800 space-y-1">
                    {map3dEmbedSrc ? (
                      <li>• Explore the 3D view directly in the embedded Google Maps iframe.</li>
                    ) : (
                      <>
                        <li>• Add a Google Maps embed iframe from Admin Panel for 3D view.</li>
                        <li>• You can still open the location link in a new tab.</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Interactive 3D Google Maps */}
            <div className="w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Interactive 3D Location Map</h3>
              {!showMap ? (
                <div className="rounded-xl shadow-lg h-64 w-full bg-linear-to-br from-red-50 to-red-100 flex items-center justify-center p-6 text-center border-2 border-red-200">
                  <div>
                    <p className="text-gray-700 font-medium mb-4">Click below to view the 3D location map</p>
                    <button
                      onClick={() => setShowMap(true)}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                    >
                      3D View
                    </button>
                  </div>
                </div>
              ) : map3dEmbedSrc ? (
                <div>
                  <iframe
                    src={map3dEmbedSrc}
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl shadow-lg w-full"
                    title={`${project.name} Google Maps 3D View`}
                  />
                </div>
              ) : (
                <div className="rounded-xl shadow-lg h-87.5 w-full bg-gray-100 flex items-center justify-center p-6 text-center">
                  <div>
                    <p className="text-gray-700 font-medium">3D map iframe is not added for this project.</p>
                    {project.locationLink && (
                      <a
                        href={project.locationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-blue-600 hover:text-blue-800 underline"
                      >
                        Open location in Google Maps
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <hr className="my-6" />

          {/* Progress Updates Section */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Progress Updates
            </h3>

            {loading ? (
              <div className="text-center py-8 text-gray-500">
                Loading updates...
              </div>
            ) : updates.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No progress updates available yet for this project.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {updates.map((update, index) => (
                  <div
                    key={update.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {update.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={16} />
                        <span>{new Date(update.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {update.description}
                    </p>
                    {index < updates.length - 1 && (
                      <div className="mt-4 border-b border-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Close Button at Bottom */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={onClose}
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
