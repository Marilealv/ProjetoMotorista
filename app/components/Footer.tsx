import { Instagram } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/gu_mil4/', label: 'Instagram' },
];

const footerLinks = {
  Empresa: [
    { label: 'Sobre Mim', href: '#about' },
    { label: 'Minha Frota', href: '#fleet' },
    { label: 'Serviços', href: '#services' },
    { label: 'Contato', href: '#contact' },
  ],
  Serviços: [
    { label: 'Transfers Aeroporto', href: '#services' },
    { label: 'Passeios pela cidade', href: '#services' },
    { label: 'Serviço por Hora', href: '#services' },
    { label: 'Serviço VIP', href: '#services' },
  ]
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black w-full">
      <div className="w-full px-12 py-20 max-w-none">

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-16">

          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo.png"
                alt="Logo"
                className="w-20 h-20 object-contain"
              />
              <span className="text-2xl tracking-wider">MOTORISTA PARTICULAR</span>
            </div>

            <p className="text-gray-400 mb-6 max-w-md">
              Serviço de motorista particular, oferecendo conforto, segurança e profissionalismo em cada viagem.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-lg">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="pt-10 border-t border-white/10">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Motorista Particular. Todos os direitos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}
