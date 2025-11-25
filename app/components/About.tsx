"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Motorista profissional e comprometido",
  "Veículos impecavelmente mantidos",
  "Serviço pontual e confiável",
  "Preços competitivos e transparentes",
  "Atendimento personalizado e dedicado",
  "Opções flexíveis de agendamento",
];

export function About() {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Fundo decorativo */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Conteúdo centralizado */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block mb-4 px-4 py-1.5 border border-white/20 rounded-full">
              <span className="text-sm text-gray-400 tracking-widest uppercase">
                Sobre Mim
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl mb-6 tracking-tight">
              Por Que Me Escolher
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
              Proporciono uma experiência excepcional com comprometimento total à
              excelência. Garanto que cada viagem seja confortável, segura e
              memorável, com atenção dedicada a cada detalhe do seu trajeto. Seu
              conforto e tranquilidade são minha prioridade.
            </p>

            {/* Lista de benefícios centralizada */}
            <div className="space-y-4 max-w-2xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-3 text-left"
                >
                  <div className="shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
