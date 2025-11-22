"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: Phone,
    title: "Telefone",
    detail: "+55 (47) 98862-9117",
    link: "tel:+5547988629117",
  },
  {
    icon: Mail,
    title: "Email",
    detail: "Gustavo.mila1911@gmail.com",
    link: "mailto:Gustavo.mila1911@gmail.com",
  },
  {
    icon: MapPin,
    title: "Localização",
    detail: "Balneário Camboriú, SC",
    link: "https://www.google.com/maps/place/Balne%C3%A1rio+Cambori%C3%BA,+SC/",
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      console.log("Enviando contato:", formData);

      const res = await fetch("/contatos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message || null,
        }),
      });

      console.log("Resposta status:", res.status);

      if (res.ok) {
        const result = await res.json();
        console.log("Sucesso:", result);

        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        
        // Limpar mensagem de sucesso após 5 segundos
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        const error = await res.json();
        console.error("Erro:", error);

        setSubmitStatus("error");
        setErrorMessage(error.message || "Erro ao enviar o formulário");
        
        // Limpar mensagem de erro após 5 segundos
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch (err) {
      console.error("Erro de conexão:", err);
      setSubmitStatus("error");
      setErrorMessage("Erro de conexão. Tente novamente.");
      
      // Limpar mensagem de erro após 5 segundos
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-glow" />
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
            <span className="text-sm text-gray-400 tracking-widest uppercase">Entre em Contato</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-4 tracking-tight">Fale Comigo</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Pronto para sua próxima viagem? Entre em contato hoje para agendar ou tirar dúvidas
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-white/20 transition-all duration-300 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                    <info.icon className="w-8 h-8" />
                  </div>
                  <div className="text-sm text-gray-400 mb-3 tracking-wider uppercase">{info.title}</div>
                  <div className="text-lg break-words">{info.detail}</div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Atendimento */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="inline-block px-8 py-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-sm text-gray-400 mb-2 tracking-wider uppercase">Horário de Atendimento</div>
              <div className="text-lg">Segunda - Domingo</div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 max-w-2xl mx-auto"
          >
            <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl mb-3">Interessado em nossos serviços?</h3>
                <p className="text-gray-400">Preencha o formulário e entrarei em contato com você</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <InputField 
                  label="Nome" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Seu nome" 
                  required 
                />
                <InputField 
                  label="Email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="seu@email.com" 
                  type="email" 
                  required 
                />
                <InputField 
                  label="Telefone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="(47) 98888-8888" 
                  type="tel" 
                  required 
                />
                <TextareaField 
                  label="Mensagem (opcional)" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="Conte-me mais sobre sua necessidade..." 
                  rows={4} 
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-lg bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                </button>

                {submitStatus === "success" && (
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-center">
                    Mensagem enviada com sucesso! Entrarei em contato em breve.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-center">
                    {errorMessage || "Ocorreu um erro ao enviar. Tente novamente ou contate pelo WhatsApp."}
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Componentes auxiliares para inputs
function InputField({ label, name, value, onChange, placeholder, type = "text", required = false }: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  placeholder?: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-gray-400 mb-2">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/20 focus:outline-none transition-colors"
      />
    </div>
  )
}

function TextareaField({ label, name, value, onChange, placeholder, rows = 4 }: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-gray-400 mb-2">{label}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/20 focus:outline-none transition-colors resize-none"
      />
    </div>
  )
}

