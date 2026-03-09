"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { projectsMeta, projectsImageBase, projectImageExtension } from "@/content/siteContent";
import { Lightbox } from "./Lightbox";

function getProjectImagePaths(slug: string, count: number): { src: string; alt: string }[] {
  const list: { src: string; alt: string }[] = [];
  for (let i = 1; i <= count; i++) {
    const num = String(i).padStart(2, "0");
    list.push({
      src: `${projectsImageBase}/${slug}/${num}${projectImageExtension}`,
      alt: `פרויקט ${slug} – תמונה ${i}`,
    });
  }
  return list;
}

export function Projects() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxProjectIndex, setLightboxProjectIndex] = useState(0);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  const openLightbox = useCallback((projectIndex: number, imageIndex: number) => {
    setLightboxProjectIndex(projectIndex);
    setLightboxImageIndex(imageIndex);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const currentMeta = projectsMeta[lightboxProjectIndex];
  const currentImages = currentMeta
    ? getProjectImagePaths(currentMeta.slug, currentMeta.imageCount)
    : [];

  const handleLightboxNavigate = useCallback(
    (delta: number) => {
      const next = lightboxImageIndex + delta;
      if (next < 0) setLightboxImageIndex(currentImages.length - 1);
      else if (next >= currentImages.length) setLightboxImageIndex(0);
      else setLightboxImageIndex(next);
    },
    [lightboxImageIndex, currentImages.length]
  );

  return (
    <>
      <section
        id="projects"
        className="scroll-mt-20 bg-warm-cream px-4 py-16 sm:py-20 md:py-24"
        aria-labelledby="projects-heading"
      >
        <div className="mx-auto max-w-6xl">
          <motion.h2
            id="projects-heading"
            className="text-2xl font-semibold text-warm-black sm:text-3xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 120, damping: 24 }}
          >
            פרויקטים
          </motion.h2>

          <div className="mt-10 space-y-16">
            {projectsMeta.map((project, projectIndex) => {
              const images = getProjectImagePaths(project.slug, project.imageCount);
              const previewCount = Math.min(4, images.length);

              return (
                <motion.article
                  key={project.slug}
                  className="rounded-xl border border-warm-sand/50 bg-warm-beige/60 p-4 shadow-sm sm:p-6"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ type: "spring", stiffness: 100, damping: 22, delay: projectIndex * 0.08 }}
                  whileHover={{
                    boxShadow: "0 12px 32px -12px rgba(26, 24, 22, 0.15)",
                    transition: { duration: 0.25 },
                  }}
                >
                  <h3 className="text-xl font-semibold text-warm-black">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-warm-charcoal">{project.description}</p>
                  <div
                    className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3"
                    role="list"
                  >
                    {images.slice(0, previewCount).map((img, i) => (
                      <motion.button
                        key={`${project.slug}-${i}`}
                        type="button"
                        onClick={() => openLightbox(projectIndex, i)}
                        className="relative aspect-[4/3] overflow-hidden rounded-lg focus-ring"
                        aria-label={`צפה בתמונה ${i + 1} מתוך ${images.length} – ${project.title}`}
                        suppressHydrationWarning
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: projectIndex * 0.08 + i * 0.04, duration: 0.3 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => openLightbox(projectIndex, 0)}
                    className="mt-4 text-sm font-medium text-accent-gold underline underline-offset-2 hover:text-accent-gold-dark focus-ring rounded px-1 py-0.5"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    suppressHydrationWarning
                  >
                    צפה בכל התמונות ({images.length})
                  </motion.button>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={currentImages}
        currentIndex={lightboxImageIndex}
        onNavigate={handleLightboxNavigate}
      />
    </>
  );
}
