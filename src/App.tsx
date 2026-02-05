import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Cpu,
  Mail,
  Share2,
  Search,
  Users,
  MessageSquare,
  BarChart3,
  Zap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Terminal,
  Globe,
  Shield,
  Play,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

// Particle Background Component
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.min(80, Math.floor(window.innerWidth / 20));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(109, 40, 217, ${p.opacity})`;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    />
  );
}

// Animated Logo Component
function GeekSpaceLogo({ className = '', size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`logo-animated relative ${sizeClasses[size]} bg-gradient-to-br from-geek-cyan via-geek-purple to-geek-pink rounded-xl flex items-center justify-center ${className}`}>
      <div className="absolute inset-[2px] bg-geek-dark rounded-[10px] flex items-center justify-center">
        <Cpu className={`${iconSizes[size]} text-transparent`} style={{
          stroke: 'url(#logo-gradient)',
          strokeWidth: 2
        }} />
        <svg width="0" height="0">
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#6d28d9" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Animated ring */}
      <div className="absolute inset-[-4px] rounded-xl border-2 border-transparent bg-gradient-to-r from-geek-cyan via-geek-purple to-geek-pink opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '2px'
        }}
      />
    </div>
  );
}

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#agent', label: 'AI Agent' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass-panel-strong border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3 group">
            <GeekSpaceLogo size="md" />
            <span className="font-display font-bold text-2xl tracking-tight group-hover:text-geek-cyan transition-colors">
              GeekSpace
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-geek-cyan to-geek-purple group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <Button className="bg-white text-geek-dark px-6 py-2.5 rounded-full font-medium hover:bg-gray-200 transition-all transform hover:scale-105">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-panel-strong rounded-2xl mt-2 p-6 space-y-4">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="block text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button className="w-full bg-white text-geek-dark px-6 py-3 rounded-full font-medium">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 25;
      const y = (e.clientY - rect.top - rect.height / 2) / 25;
      setMousePos({ x, y });
    };

    const handleMouseLeave = () => {
      setMousePos({ x: 0, y: 0 });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      });

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.4
      });

      gsap.from('.hero-cta', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.6
      });

      gsap.from('.hero-card', {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <ParticleBackground />

      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-geek-purple/20 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-geek-cyan/20 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-geek-pink/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="hero-title inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="badge-pulse w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-red-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-300">First in Hyderabad • 10+ Clients in 7 Days</span>
          </div>

          <h1 className="hero-title font-display text-5xl md:text-7xl font-bold leading-tight">
            AI Agents That <br />
            <span className="gradient-text">Actually Deliver</span>
          </h1>

          <p className="hero-subtitle text-xl text-gray-400 max-w-lg leading-relaxed">
            We build autonomous AI systems that handle everything from lead generation to customer support. Your digital workforce, always on.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4">
            <Button className="btn-primary bg-gradient-to-r from-geek-purple to-geek-cyan text-white px-8 py-6 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-geek-purple/25 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
              <span>Deploy Your Agent</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" className="px-8 py-6 rounded-full font-semibold text-lg border-white/20 hover:bg-white/5 transition-all flex items-center justify-center space-x-2">
              <Play className="w-5 h-5" />
              <span>View Demo</span>
            </Button>
          </div>

          <div className="hero-cta flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full border-2 border-geek-dark bg-gradient-to-br ${
                    i === 1 ? 'from-geek-purple to-geek-cyan' :
                    i === 2 ? 'from-geek-cyan to-geek-pink' :
                    i === 3 ? 'from-geek-pink to-geek-purple' :
                    'from-amber-400 to-red-500'
                  } flex items-center justify-center text-xs font-bold`}
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p>Trusted by 10+ Hyderabad businesses</p>
          </div>
        </div>

        {/* Right Interactive Terminal */}
        <div ref={cardRef} className="hero-card relative perspective-1000">
          <div
            className="tilt-card terminal-window glow-purple"
            style={{
              transform: `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`
            }}
          >
            {/* Terminal Header */}
            <div className="terminal-header">
              <div className="flex space-x-2">
                <div className="terminal-dot red" />
                <div className="terminal-dot yellow" />
                <div className="terminal-dot green" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-gray-500 font-mono">geekspace_agent_v2.4.js</span>
              </div>
              <div className="w-16" />
            </div>

            {/* Terminal Content */}
            <div className="p-6 space-y-4 font-mono text-sm scanline relative">
              <div className="flex items-center space-x-2 text-green-400">
                <span className="text-geek-cyan">➜</span>
                <span className="typing-cursor">Initializing GeekSpace AI Agent...</span>
              </div>

              <div className="space-y-3" id="code-lines">
                <div className="code-block p-4 rounded-lg border border-white/5">
                  <div className="text-gray-400 mb-2">// Autonomous Task Execution</div>
                  <div className="text-purple-400">const <span className="text-blue-400">agent</span> = <span className="text-yellow-400">new</span> <span className="text-green-400">AIAgent</span>({'{'}</div>
                  <div className="pl-4 text-orange-400">capabilities: [<span className="text-green-300">'lead_gen'</span>, <span className="text-green-300">'support'</span>, <span className="text-green-300">'seo'</span>],</div>
                  <div className="pl-4 text-orange-400">autonomy: <span className="text-purple-400">true</span>,</div>
                  <div className="pl-4 text-orange-400">location: <span className="text-green-300">'Hyderabad'</span></div>
                  <div className="text-purple-400">{'}'});</div>
                </div>

                <div className="flex items-center space-x-2 text-gray-400">
                  <span className="text-geek-cyan">➜</span>
                  <span>agent.deploy()</span>
                </div>

                <div className="space-y-2 pl-6 border-l-2 border-geek-purple/30">
                  {['Connected to CRM', 'Knowledge base indexed', '10+ clients synced', 'Neural networks loaded'].map((item, i) => (
                    <div key={i} className="flex items-center space-x-2 text-green-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-2 text-geek-cyan animate-pulse">
                  <span>➜</span>
                  <span>Agent active and learning..._</span>
                </div>
              </div>
            </div>

            {/* Floating Status Badge */}
            <div className="absolute -right-4 -top-4 bg-gradient-to-r from-geek-purple to-geek-cyan text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg animate-float flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Live Status</span>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-r from-geek-purple/20 to-geek-cyan/20 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 text-gray-500">
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gray-500 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// Social Proof Strip
function SocialProofStrip() {
  return (
    <section className="border-y border-white/10 bg-white/5 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Trusted by Hyderabad's Fastest Growing Startups</p>
            <p className="text-2xl font-display font-bold gradient-text-cyan">10+ Clients in Just 7 Days</p>
          </div>
          <div className="flex items-center space-x-8">
            {['TechFlow', 'DataSync', 'CloudNine', 'InnovateHub'].map((name, i) => (
              <div
                key={name}
                className="h-10 px-4 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 font-medium hover:bg-white/20 hover:text-white transition-all cursor-pointer"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              },
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: 'power3.out'
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: Mail,
      title: 'Inbox Management',
      description: 'AI reads, categorizes, and responds to emails. Never miss a lead or support ticket again.',
      gradient: 'from-[#6d28d9] to-[#8b5cf6]',
      features: ['Smart categorization', 'Auto-responses', 'Priority inbox']
    },
    {
      icon: Share2,
      title: 'Social Automation',
      description: 'Creates, schedules, and posts content across all platforms. Maintains your brand voice 24/7.',
      gradient: 'from-[#06b6d4] to-[#3b82f6]',
      features: ['Content creation', 'Multi-platform', 'Analytics']
    },
    {
      icon: Search,
      title: 'SEO & Content',
      description: 'Autonomous keyword research, blog writing, and optimization. Ranks you while you sleep.',
      gradient: 'from-[#ec4899] to-[#f43f5e]',
      features: ['Keyword research', 'Blog automation', 'Rank tracking']
    },
    {
      icon: Users,
      title: 'Lead Generation',
      description: 'Scrapes, qualifies, and nurtures leads automatically. Fills your pipeline without manual work.',
      gradient: 'from-[#f59e0b] to-[#f97316]',
      features: ['Lead scraping', 'Qualification', 'Nurturing']
    },
    {
      icon: MessageSquare,
      title: 'Customer Support',
      description: '24/7 intelligent responses that learn from your knowledge base and past interactions.',
      gradient: 'from-[#10b981] to-[#22c55e]',
      features: ['24/7 availability', 'Knowledge base', 'Smart routing']
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reports',
      description: 'Automated data collection and insight generation. Know your metrics without the manual work.',
      gradient: 'from-[#6366f1] to-[#8b5cf6]',
      features: ['Auto reports', 'Insights', 'Dashboards']
    }
  ];

  return (
    <section id="services" ref={sectionRef} className="py-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Sparkles className="w-4 h-4 text-[#06b6d4]" />
            <span className="text-sm font-medium text-gray-300">Full-Stack AI Automation</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Everything You Need,<br />
            <span className="gradient-text">Fully Autonomous</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your AI agent handles the entire backend—so you focus on growth while we handle the execution.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="glass-panel p-8 rounded-2xl border border-white/10 relative overflow-hidden group hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300"
              style={{
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 text-white shadow-lg`}>
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <div className="space-y-2 mb-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-2 text-sm text-gray-500">
                      <CheckCircle2 className="w-4 h-4 text-[#06b6d4]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center text-[#06b6d4] text-sm font-medium group-hover:translate-x-2 transition-transform">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// AI Agent Demo Section
function AgentDemoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.demo-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.from('.demo-visual', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const capabilities = [
    {
      title: 'Neural Processing',
      description: 'Advanced language models that understand context and intent.',
      icon: Cpu
    },
    {
      title: 'Auto-Learning',
      description: 'Continuously improves from interactions and feedback.',
      icon: Sparkles
    },
    {
      title: 'Multi-Platform',
      description: 'Works across email, chat, social, and voice channels.',
      icon: Globe
    },
    {
      title: 'Secure & Private',
      description: 'Enterprise-grade security with data encryption.',
      icon: Shield
    }
  ];

  return (
    <section id="agent" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-geek-purple/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-geek-cyan/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="demo-content space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <Terminal className="w-4 h-4 text-geek-cyan" />
              <span className="text-sm font-medium text-gray-300">How It Works</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Meet Your <br />
              <span className="gradient-text">Digital Workforce</span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              Our AI agents don't just respond—they think, learn, and act. From the moment you deploy, they start understanding your business, your customers, and your goals.
            </p>

            <div className="space-y-4">
              {capabilities.map((cap, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 p-4 rounded-xl cursor-pointer transition-all ${
                    activeTab === index ? 'bg-white/10 border border-white/20' : 'hover:bg-white/5'
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activeTab === index
                      ? 'bg-gradient-to-br from-geek-cyan to-geek-purple'
                      : 'bg-white/10'
                  }`}>
                    <cap.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{cap.title}</h4>
                    <p className="text-sm text-gray-400">{cap.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="btn-primary bg-gradient-to-r from-geek-purple to-geek-cyan text-white px-8 py-6 rounded-full font-semibold hover:shadow-2xl hover:shadow-geek-purple/25 transition-all">
              <span>Deploy in Minutes</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Right Visual */}
          <div className="demo-visual relative">
            <div className="relative">
              {/* Main Agent Visual */}
              <div className="glass-panel rounded-3xl p-8 border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-geek-purple/20 via-transparent to-geek-cyan/20" />

                {/* Central Orb */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-geek-purple via-geek-cyan to-geek-pink animate-morph flex items-center justify-center mb-6 glow-purple">
                    <div className="w-24 h-24 rounded-full bg-geek-dark flex items-center justify-center">
                      <Cpu className="w-12 h-12 text-geek-cyan" />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold mb-2">Agent Active</h3>
                  <div className="status-indicator text-green-400 mb-6">
                    <span className="status-dot" />
                    <span className="text-sm">Processing 24/7</span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 w-full">
                    {[
                      { label: 'Tasks', value: '2,847' },
                      { label: 'Uptime', value: '99.9%' },
                      { label: 'Speed', value: '<50ms' }
                    ].map((stat, i) => (
                      <div key={i} className="text-center p-4 bg-white/5 rounded-xl">
                        <div className="text-2xl font-bold gradient-text-cyan">{stat.value}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Orbiting Elements */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center animate-float">
                  <Mail className="w-5 h-5 text-geek-cyan" />
                </div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center animate-float-delayed">
                  <MessageSquare className="w-5 h-5 text-geek-pink" />
                </div>
                <div className="absolute top-1/2 -right-2 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
              </div>

              {/* Decorative Ring */}
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full animate-rotate-slow" />
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Portfolio Section
function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.portfolio-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      name: 'TechFlow Solutions',
      category: 'Lead Generation',
      description: 'AI agent handling 500+ leads monthly with 40% conversion boost',
      stats: { leads: '500+', conversion: '+40%' },
      gradient: 'from-geek-purple to-violet-600'
    },
    {
      name: 'DataSync Pro',
      category: 'Customer Support',
      description: '24/7 support automation reducing response time by 80%',
      stats: { response: '<1min', satisfaction: '98%' },
      gradient: 'from-geek-cyan to-blue-600'
    },
    {
      name: 'CloudNine Media',
      category: 'Social Automation',
      description: 'Full social media management with 3x engagement growth',
      stats: { posts: '200+', engagement: '+300%' },
      gradient: 'from-geek-pink to-rose-600'
    },
    {
      name: 'InnovateHub',
      category: 'SEO & Content',
      description: 'Autonomous content strategy driving 5x organic traffic',
      stats: { traffic: '5x', ranking: '#1' },
      gradient: 'from-amber-400 to-orange-600'
    }
  ];

  return (
    <section id="portfolio" ref={sectionRef} className="py-32 relative">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <BarChart3 className="w-4 h-4 text-geek-cyan" />
            <span className="text-sm font-medium text-gray-300">Success Stories</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Proven <span className="gradient-text">Results</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See how businesses in Hyderabad are transforming with our AI agents.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="portfolio-item portfolio-card glass-panel rounded-2xl overflow-hidden border border-white/10 group cursor-pointer"
            >
              {/* Card Header */}
              <div className={`h-32 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 right-4">
                  <ExternalLink className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs uppercase tracking-wider text-white/70">{project.category}</span>
                  <h3 className="text-xl font-bold text-white">{project.name}</h3>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <p className="text-gray-400 mb-4">{project.description}</p>

                <div className="flex space-x-6">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key}>
                      <div className="text-xl font-bold gradient-text-cyan">{value}</div>
                      <div className="text-xs text-gray-500 uppercase">{key}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="portfolio-content absolute inset-0 bg-geek-dark/95 flex items-center justify-center p-6">
                <div className="text-center">
                  <p className="text-gray-300 mb-4">Want similar results for your business?</p>
                  <Button className="bg-white text-geek-dark px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-all">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-geek-purple/20 to-geek-cyan/20 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="contact-content grid lg:grid-cols-2 gap-16">
          {/* Left Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Ready to <span className="gradient-text">Transform</span> Your Business?
              </h2>
              <p className="text-gray-400 text-lg">
                Let's discuss how our AI agents can automate your workflows and accelerate your growth.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'hello@geekspace.ai' },
                { icon: Globe, label: 'Location', value: 'Hyderabad, India' },
                { icon: Zap, label: 'Response Time', value: '< 24 hours' }
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-geek-cyan" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{item.label}</div>
                    <div className="font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <div className="glass-panel rounded-2xl p-8 border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-geek-cyan focus:outline-none transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-geek-cyan focus:outline-none transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-geek-cyan focus:outline-none transition-colors h-32 resize-none"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full btn-primary bg-gradient-to-r from-geek-purple to-geek-cyan text-white py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-geek-purple/25 transition-all"
              >
                Send Message
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-geek-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <a href="#" className="flex items-center space-x-2">
              <GeekSpaceLogo size="sm" />
              <span className="font-display font-bold text-xl">GeekSpace</span>
            </a>
            <p className="text-gray-400 text-sm">
              Building the future of autonomous AI agents for businesses worldwide.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {['Inbox Management', 'Social Automation', 'SEO & Content', 'Lead Generation'].map(item => (
                <li key={item}><a href="#services" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {['About', 'Portfolio', 'Careers', 'Contact'].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">
            © 2026 GeekSpace. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  return (
    <div className="min-h-screen bg-geek-dark text-white mesh-gradient noise-overlay">
      <Navigation />
      <main>
        <HeroSection />
        <SocialProofStrip />
        <ServicesSection />
        <AgentDemoSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
