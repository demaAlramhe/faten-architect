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

function getProjectCategory(slug: string): string {
  if (slug === "apartment") return "מגורים";
  if (slug === "teen-room") return "הום סטיילינג";
  if (slug === "jewelry-store") return "מסחרי";
  return "פרויקט";
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
        className="section-shell scroll-mt-24 bg-warm-cream px-4"
        aria-labelledby="projects-heading"
      >
        <div className="mx-auto max-w-6xl">
          <motion.p
            className="section-kicker text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.4 }}
          >
            Portfolio
          </motion.p>
          <motion.h2
            id="projects-heading"
            className="section-title mt-3 text-center"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ type: "spring", stiffness: 120, damping: 24 }}
          >
            פרויקטים
          </motion.h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-warm-charcoal">
            עבודות נבחרות שממחישות דיוק תכנוני, חומריות נקייה ותחושת יוקרה מאוזנת.
          </p>

          <div className="mt-12 space-y-10">
            {projectsMeta.map((project, projectIndex) => {
              const images = getProjectImagePaths(project.slug, project.imageCount);
              const previewCount = Math.min(4, images.length);

              return (
                <motion.article
                  key={project.slug}
                  className="glass-card overflow-hidden p-4 sm:p-6"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ type: "spring", stiffness: 100, damping: 22, delay: projectIndex * 0.08 }}
                  whileHover={{
                    boxShadow: "0 24px 40px -24px rgba(26,24,22,0.4)",
                    transition: { duration: 0.25 },
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <span className="inline-flex rounded-full border border-accent-gold/35 bg-accent-gold/10 px-3 py-1 text-xs font-semibold text-accent-gold">
                        {getProjectCategory(project.slug)}
                      </span>
                      <h3 className="mt-3 text-2xl font-semibold text-warm-black">{project.title}</h3>
                      <p className="mt-2 max-w-3xl text-warm-charcoal">{project.description}</p>
                    </div>
                    <p className="rounded-full bg-warm-sand/50 px-3 py-1 text-xs text-warm-charcoal">
                      {images.length} תמונות בפרויקט
                    </p>
                  </div>

                  <div
                    className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3"
                    role="list"
                  >
                    {images.slice(0, previewCount).map((img, i) => (
                      <motion.button
                        key={`${project.slug}-${i}`}
                        type="button"
                        onClick={() => openLightbox(projectIndex, i)}
                        className="group relative aspect-[4/3] overflow-hidden rounded-xl focus-ring"
                        aria-label={`צפה בתמונה ${i + 1} מתוך ${images.length} – ${project.title}`}
                        suppressHydrationWarning
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: projectIndex * 0.08 + i * 0.04, duration: 0.3 }}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                      </motion.button>
                    ))}
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => openLightbox(projectIndex, 0)}
                    className="mt-5 inline-flex items-center rounded-full border border-accent-gold/35 bg-accent-gold/10 px-4 py-2 text-sm font-semibold text-accent-gold transition hover:border-accent-gold hover:bg-accent-gold/15 hover:text-accent-gold-dark focus-ring"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    suppressHydrationWarning
                  >
                    צפה בגלריה המלאה ({images.length})
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
