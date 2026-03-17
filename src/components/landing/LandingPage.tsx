'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../estoque/ui/button';
import { Card, CardContent } from '../estoque/ui/card';
import { 
  Sparkles, 
  Shield, 
  Zap, 
  BarChart3, 
  Box, 
  Users, 
  ArrowRight, 
  CheckCircle2,
  Package,
  Activity,
  Globe,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white selection:bg-yellow-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              WorkConnect
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-yellow-400 transition-colors">Funcionalidades</a>
            <a href="#about" className="hover:text-yellow-400 transition-colors">Sobre</a>
            <a href="#pricing" className="hover:text-yellow-400 transition-colors">Preços</a>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/5">
                Entrar
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold px-6 shadow-[0_0_20px_rgba(255,213,79,0.3)]">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[150px] -z-10 animate-pulse delay-1000" />

        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold mb-6 animate-fadeInUp">
                <Sparkles className="w-3 h-3" />
                <span>REVOLUCIONANDO A GESTÃO DE ESTOQUE</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 animate-fadeInUp delay-100">
                O futuro da sua <br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
                  Logística Inteligente
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 mb-10 max-w-2xl animate-fadeInUp delay-200">
                Controle seu inventário em tempo real com precisão absoluta. 
                Utilize IA para prever demandas, evitar perdas e otimizar cada centavo do seu negócio.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 animate-fadeInUp delay-300">
                <Link href="/dashboard">
                  <Button size="lg" className="h-14 px-8 bg-yellow-400 text-black hover:bg-yellow-500 font-bold text-lg rounded-2xl shadow-xl shadow-yellow-500/20 group">
                    Começar Agora
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="h-14 px-8 border-white/10 hover:bg-white/5 text-lg rounded-2xl">
                  Ver Demonstração
                </Button>
              </div>

              <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8 text-gray-500 animate-fadeInUp delay-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Grátis para PMEs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Setup em 5 minutos</span>
                </div>
              </div>
            </div>

            <div className="flex-1 relative animate-scaleIn">
              <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black">
                <img 
                  src="/hero.png" 
                  alt="WorkConnect Dashboard Preview" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-10 -right-10 bg-gray-900/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl animate-float">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Lucratividade</div>
                    <div className="text-lg font-bold">+24.8%</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-10 -left-10 bg-gray-900/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl animate-float delay-1000">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Status do Estoque</div>
                    <div className="text-lg font-bold">Saudável</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-6">Tudo o que você precisa para crescer</h2>
            <p className="text-gray-400 text-lg">
              Deixamos a gestão complexa para trás. Foque no que importa: <br />
              escalar suas vendas e satisfazer seus clientes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Box className="w-6 h-6" />,
                title: "Gestão Multiativos",
                desc: "Controle produtos, categorias e fornecedores em uma interface unificada e intuitiva.",
                color: "yellow"
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Análise Preditiva",
                desc: "Algoritmos que analisam seu histórico para sugerir reposições antes que o estoque acabe.",
                color: "orange"
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Segurança de Dados",
                desc: "Sua base de dados protegida com criptografia militar e backups automáticos diários.",
                color: "blue"
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Tempo Real",
                desc: "Dê adeus aos delays. Movimentações são processadas instantaneamente em todos os terminais.",
                color: "green"
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Colaboração",
                desc: "Permissões granulares para sua equipe trabalhar em harmonia, sem conflitos de dados.",
                color: "purple"
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Acesso Remoto",
                desc: "Gerencie seu estoque de qualquer lugar do mundo, em qualquer dispositivo.",
                color: "red"
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="group p-8 rounded-3xl bg-gray-900/40 border border-white/5 hover:border-yellow-400/20 transition-all hover:-translate-y-2"
              >
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-yellow-400 transition-colors group-hover:text-black`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-500 line-height-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent -z-10" />
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto p-12 lg:p-20 rounded-[40px] bg-gradient-to-br from-gray-900 to-black border border-white/10 text-center relative overflow-hidden">
            {/* Background elements for CTA */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-400/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-400/10 rounded-full blur-[80px]" />

            <h2 className="text-4xl md:text-5xl font-bold mb-8 relative z-10">
              Pronto para levar seu estoque <br /> ao próximo nível?
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto relative z-10">
              Junte-se a centenas de empresas que já otimizaram sua operação com o WorkConnect. 
              Comece agora mesmo, sem custos de implantação.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="h-16 px-10 bg-white text-black hover:bg-gray-100 font-bold text-xl rounded-2xl shadow-2xl relative z-10 group">
                Acesse o Dashboard
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </div>
              <span className="text-lg font-bold">WorkConnect</span>
            </div>
            
            <div className="text-gray-500 text-sm">
              © 2024 WorkConnect. Criado para o TCC SENAI.
            </div>

            <div className="flex items-center space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Termos</a>
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors text-2xl"><i className="fab fa-github"></i></a>
            </div>
          </div>
        </div>
      </footer>

      {/* Styles for animations used in the component */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .line-height-relaxed { line-height: 1.7; }
      `}</style>
    </div>
  );
}
