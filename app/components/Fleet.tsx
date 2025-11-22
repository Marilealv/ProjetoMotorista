"use client";

import { motion } from "framer-motion";
import { Zap, Users, Shield, Gauge, Battery, Leaf } from "lucide-react";

// Imagens reais do seu public/
const havalImage = "/main.png";
const oraImage = "/ora-03-skin-preto_hematita (1).jpeg";

const cars = [
  {
    name: "Haval H6 PHEV34",
    type: "SUV Híbrido Plug-in",
    year: "2024",
    image: havalImage,
    features: [
      "Motor Híbrido 1.5T",
      "Até 5 Passageiros",
      "Tração 4x4",
      "Modo 100% Elétrico",
      "Tecnologia Avançada",
    ],
    specs: [
      { icon: Users, label: "Até 5 Passageiros" },
      { icon: Gauge, label: "Motor 1.5 Turbo + Elétrico" },
      { icon: Shield, label: "Segurança Nível 5" },
    ],
    highlights: [
      "Sistema Híbrido Plug-in",
      "Conectividade Avançada",
      "Interior Premium",
    ],
  },

  {
    name: "GWM Ora 03 Skin",
    type: "Hatchback 100% Elétrico",
    year: "2024",
    image: oraImage,
    features: [
      "100% Elétrico",
      "Autonomia 400km",
      "Design Retrô-Futurista",
      "Tecnologia de Ponta",
    ],
    specs: [
      { icon: Zap, label: "171cv de Potência" },
      { icon: Battery, label: "Longa Autonomia" },
      { icon: Leaf, label: "Zero Emissões" },
    ],
    highlights: [
      "Recarga Rápida",
      "Interior Moderno",
      "Silencioso e Econômico",
    ],
  },
];

export function Fleet() {
  return (
    <section id="fleet" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/98 to-black">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 px-4 py-1.5 border border-white/20 rounded-full">
            <span className="text-sm text-gray-400 tracking-widest uppercase">
              Minha Frota
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-4 tracking-tight">
            Frota Premium
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Veículos modernos cuidadosamente selecionados para proporcionar
            máximo conforto e segurança
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {cars.map((car, index) => (
            <motion.div
              key={car.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
                {/* Imagem */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <span className="text-xs tracking-wider">{car.type}</span>
                  </div>

                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/20">
                    <span className="text-xs tracking-wider">{car.year}</span>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl mb-6">{car.name}</h3>

                  <div className="grid grid-cols-1 gap-4 mb-6">
                    {car.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-3 text-gray-400"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                          <spec.icon className="w-5 h-5" />
                        </div>
                        <span>{spec.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <p className="text-sm text-gray-500 mb-3 tracking-wide uppercase">
                      Características
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {car.features.map((feature, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-2 mt-4">
                      {car.highlights.map((highlight, i) => (
                        <div
                          key={i}
                          className="flex items-center space-x-2 text-gray-400 text-sm"
                        >
                          <div className="w-1 h-1 bg-gray-400 rounded-full" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
