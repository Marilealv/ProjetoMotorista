"use client";

import { motion } from "framer-motion";
import { Car, MapPin, Clock, Star, Shield, Headphones } from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Transfers aeroporto",
    description:
      "Serviço confiável e pontual de busca e entrega no aeroporto. Acompanhamento de voo para timing perfeito.",
  },
  {
    icon: MapPin,
    title: "Trajeto entre cidades",
    description:
      "Vá a cidades próximas com segurança e conforto, entre em contato para ver as disponibilidades.",
  },
  {
    icon: Clock,
    title: "Serviço por hora",
    description:
      "Opções flexíveis de locação por hora para reuniões de negócios, compras ou ocasiões especiais.",
  },
  {
    icon: Star,
    title: "Serviço de bordo personalizado",
    description:
      "Experiência personalizada pela escolha do cliente, adaptada às suas preferências e necessidades.",
  },
  {
    icon: Shield,
    title: "Seguro e protegido",
    description:
      "Sua segurança é minha prioridade. Veículos equipados com recursos de segurança e seguro total.",
  },
  {
    icon: Headphones,
    title: "Atendimento dedicado",
    description:
      "Suporte atencioso e personalizado para garantir que sua viagem seja tranquila do início ao fim.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
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
              Serviços
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-4 tracking-tight">
            O que ofereço
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Serviços personalizados para atender todas as suas necessidades de
            transporte com excelência e conforto
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-8 bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl hover:border-white/20 hover:bg-white/[0.02] transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl mb-3">{service.title}</h3>

                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
