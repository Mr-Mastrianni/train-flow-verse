import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Index = () => {
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const searchCanvasRef = useRef<HTMLCanvasElement>(null);
  const communityCanvasRef = useRef<HTMLCanvasElement>(null);
  const organizerCanvasRef = useRef<HTMLCanvasElement>(null);
  const partnersCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Particle Background System
    if (particleCanvasRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: particleCanvasRef.current, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Create particles
      const particleCount = 500;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 2000;
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const particleMaterial = new THREE.PointsMaterial({
        color: 0x667eea,
        size: 2,
        transparent: true,
        opacity: 0.6
      });

      const particleSystem = new THREE.Points(particles, particleMaterial);
      scene.add(particleSystem);

      camera.position.z = 1000;

      const animateParticles = () => {
        requestAnimationFrame(animateParticles);
        
        particleSystem.rotation.x += 0.001;
        particleSystem.rotation.y += 0.002;
        
        renderer.render(scene, camera);
      };

      animateParticles();

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    // Hero Section Wave Ocean
    if (heroCanvasRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: heroCanvasRef.current, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight * 0.8);

      const geometry = new THREE.PlaneGeometry(200, 200, 50, 50);
      const material = new THREE.MeshBasicMaterial({ 
        color: 0x667eea,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });

      const ocean = new THREE.Mesh(geometry, material);
      ocean.rotation.x = -Math.PI / 3;
      scene.add(ocean);

      camera.position.z = 100;
      camera.position.y = 50;

      const animateOcean = () => {
        requestAnimationFrame(animateOcean);
        
        const positions = geometry.attributes.position.array as Float32Array;
        const time = Date.now() * 0.001;
        
        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i];
          const y = positions[i + 1];
          positions[i + 2] = Math.sin(x * 0.1 + time) * 5 + Math.cos(y * 0.1 + time) * 5;
        }
        
        geometry.attributes.position.needsUpdate = true;
        ocean.rotation.z += 0.005;
        
        renderer.render(scene, camera);
      };

      animateOcean();
    }
  }, []);

  const showModal = (type: string) => {
    const modal = document.getElementById(`${type}-modal`);
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  };

  const hideModal = (type: string) => {
    const modal = document.getElementById(`${type}-modal`);
    if (modal) {
      modal.classList.remove('flex');
      modal.classList.add('hidden');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Particle Background */}
      <canvas 
        ref={particleCanvasRef}
        className="particle-canvas"
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <i className="fas fa-running text-white"></i>
              </div>
              <span className="text-xl font-bold gradient-text">Free Sports Training</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="hover:text-primary transition-colors">
                <i className="fas fa-home mr-2"></i>Home
              </a>
              <a href="#search" className="hover:text-primary transition-colors">
                <i className="fas fa-search mr-2"></i>Find Training
              </a>
              <a href="#community" className="hover:text-primary transition-colors">
                <i className="fas fa-users mr-2"></i>Community
              </a>
              <a href="#organize" className="hover:text-primary transition-colors">
                <i className="fas fa-calendar-plus mr-2"></i>Organize
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => showModal('login')}
                className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-lg"
              >
                Login
              </button>
              <button 
                onClick={() => showModal('signup')}
                className="px-4 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-glow transition-all duration-300"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        <canvas 
          ref={heroCanvasRef}
          className="scene-canvas"
        />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 morph">
            <span className="gradient-text">Connect.</span>
            <br />
            <span className="gradient-text">Train.</span>
            <br />
            <span className="gradient-text">Grow.</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-muted-foreground">
            Join the ultimate sports training community. Find sessions, connect with athletes, and elevate your game.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => showModal('participant')}
              className="px-8 py-4 bg-gradient-primary text-white text-lg font-semibold rounded-xl hover-3d glow floating"
            >
              <i className="fas fa-user-plus mr-3"></i>
              Join as Participant
            </button>
            <button 
              onClick={() => showModal('organizer')}
              className="px-8 py-4 border-2 border-primary text-primary text-lg font-semibold rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover-3d"
            >
              <i className="fas fa-calendar-plus mr-3"></i>
              Become Organizer
            </button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section id="search" className="relative py-20 bg-card">
        <canvas 
          ref={searchCanvasRef}
          className="scene-canvas opacity-20"
        />
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Find Your Perfect Training</h2>
            <p className="text-xl text-muted-foreground">Discover sessions tailored to your sport, location, and skill level</p>
          </div>

          <div className="max-w-4xl mx-auto bg-background rounded-2xl p-8 shadow-3d hover-3d">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Sport</label>
                <select className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary">
                  <option>Basketball</option>
                  <option>Football</option>
                  <option>Tennis</option>
                  <option>Swimming</option>
                  <option>Running</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Location</label>
                <input 
                  type="text" 
                  placeholder="Enter city or zip"
                  className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Age Group</label>
                <select className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary">
                  <option>All Ages</option>
                  <option>Under 18</option>
                  <option>18-25</option>
                  <option>26-35</option>
                  <option>35+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Skill Level</label>
                <select className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Professional</option>
                </select>
              </div>
            </div>
            
            <button className="w-full mt-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-glow transition-all duration-300 hover-3d">
              <i className="fas fa-search mr-3"></i>
              Search Training Sessions
            </button>
          </div>
        </div>
      </section>

      {/* Featured Training Cards */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">Featured Training Sessions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                sport: 'Basketball',
                title: 'Elite Skills Training',
                instructor: 'Coach Sarah',
                location: 'Downtown Court',
                time: 'Mon & Wed 6PM',
                price: 'Free',
                icon: 'fas fa-basketball-ball',
                participants: 12
              },
              {
                sport: 'Football',
                title: 'Youth Development',
                instructor: 'Coach Mike',
                location: 'City Park',
                time: 'Sat 10AM',
                price: 'Free',
                icon: 'fas fa-football-ball',
                participants: 18
              },
              {
                sport: 'Tennis',
                title: 'Beginner Basics',
                instructor: 'Coach Anna',
                location: 'Tennis Center',
                time: 'Sun 2PM',
                price: 'Free',
                icon: 'fas fa-table-tennis',
                participants: 8
              }
            ].map((session, index) => (
              <div key={index} className="bg-card rounded-2xl p-6 hover-3d glow floating border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <i className={`${session.icon} text-white text-lg`}></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{session.title}</h3>
                      <p className="text-muted-foreground">{session.sport}</p>
                    </div>
                  </div>
                  <span className="bg-sports-success text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {session.price}
                  </span>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-muted-foreground">
                    <i className="fas fa-user-tie w-5"></i>
                    <span className="ml-2">{session.instructor}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <i className="fas fa-map-marker-alt w-5"></i>
                    <span className="ml-2">{session.location}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <i className="fas fa-clock w-5"></i>
                    <span className="ml-2">{session.time}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <i className="fas fa-users w-5"></i>
                    <span className="ml-2">{session.participants} participants</span>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-gradient-primary text-white font-semibold rounded-lg hover:shadow-glow transition-all duration-300">
                  Join Session
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="relative py-20 bg-card">
        <canvas 
          ref={communityCanvasRef}
          className="scene-canvas opacity-30"
        />
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Join Our Community</h2>
            <p className="text-xl text-muted-foreground">Connect with athletes, share experiences, and grow together</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: 'fas fa-users',
                title: 'Connect',
                description: 'Meet like-minded athletes in your area'
              },
              {
                icon: 'fas fa-calendar',
                title: 'Schedule',
                description: 'Organize and join training sessions'
              },
              {
                icon: 'fas fa-trophy',
                title: 'Achieve',
                description: 'Track progress and celebrate milestones'
              },
              {
                icon: 'fas fa-comments',
                title: 'Discuss',
                description: 'Share tips and techniques with others'
              },
              {
                icon: 'fas fa-map',
                title: 'Explore',
                description: 'Discover new training locations nearby'
              },
              {
                icon: 'fas fa-star',
                title: 'Excel',
                description: 'Learn from experienced coaches and athletes'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center hover-3d floating p-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 glow">
                  <i className={`${feature.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizer Section */}
      <section id="organize" className="relative py-20">
        <canvas 
          ref={organizerCanvasRef}
          className="scene-canvas opacity-20"
        />
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Become an Organizer</h2>
            <p className="text-xl text-muted-foreground">Lead training sessions and build your coaching community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                {[
                  {
                    icon: 'fas fa-calendar-plus',
                    title: 'Easy Scheduling',
                    description: 'Create and manage training sessions with our intuitive tools'
                  },
                  {
                    icon: 'fas fa-users-cog',
                    title: 'Participant Management',
                    description: 'Track attendance, communicate with participants, and build your community'
                  },
                  {
                    icon: 'fas fa-chart-line',
                    title: 'Growth Analytics',
                    description: 'Monitor your sessions performance and participant engagement'
                  },
                  {
                    icon: 'fas fa-money-bill-wave',
                    title: 'Monetization Options',
                    description: 'Offer premium sessions and earn from your coaching expertise'
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 hover-3d">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 glow">
                      <i className={`${benefit.icon} text-white`}></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-background rounded-2xl p-8 shadow-3d hover-3d">
              <h3 className="text-2xl font-bold mb-6 text-center gradient-text">Start Organizing Today</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Sport Expertise</label>
                  <select className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary">
                    <option>Basketball</option>
                    <option>Football</option>
                    <option>Tennis</option>
                    <option>Swimming</option>
                    <option>Running</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Experience Level</label>
                  <select className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary">
                    <option>Professional Coach</option>
                    <option>Former Athlete</option>
                    <option>Experienced Player</option>
                    <option>Passionate Beginner</option>
                  </select>
                </div>
                <button className="w-full py-4 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-glow transition-all duration-300 hover-3d">
                  <i className="fas fa-rocket mr-3"></i>
                  Start Organizing
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="relative py-20 bg-card">
        <canvas 
          ref={partnersCanvasRef}
          className="scene-canvas opacity-30"
        />
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Our Partners</h2>
            <p className="text-xl text-muted-foreground">Trusted by leading sports organizations worldwide</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              'SportsTech Inc', 'Athletic Alliance', 'FitPro Networks', 'Champion Sports',
              'Elite Training Co', 'Active Life', 'Sports United', 'Peak Performance'
            ].map((partner, index) => (
              <div key={index} className="bg-background rounded-xl p-6 text-center hover-3d floating glow">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-handshake text-2xl text-white"></i>
                </div>
                <h3 className="font-semibold text-sm">{partner}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <i className="fas fa-running text-white"></i>
                </div>
                <span className="text-xl font-bold gradient-text">Free Sports Training</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Connecting athletes and building stronger communities through accessible sports training.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <i className={`fab fa-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Platform</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Find Training</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Become Organizer</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Mobile App</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Report Issue</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center"><i className="fas fa-envelope w-5 mr-2"></i>hello@freesportstraining.com</li>
                <li className="flex items-center"><i className="fas fa-phone w-5 mr-2"></i>+1 (555) 123-4567</li>
                <li className="flex items-center"><i className="fas fa-map-marker-alt w-5 mr-2"></i>San Francisco, CA</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Free Sports Training. All rights reserved. Built with passion for the sports community.</p>
          </div>
        </div>
      </footer>

      {/* Modal Components */}
      {['login', 'signup', 'participant', 'organizer'].map((modalType) => (
        <div key={modalType} id={`${modalType}-modal`} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
          <div className="bg-background rounded-2xl p-8 max-w-md w-full shadow-3d">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold gradient-text">
                {modalType === 'login' && 'Welcome Back'}
                {modalType === 'signup' && 'Join Our Community'}
                {modalType === 'participant' && 'Join as Participant'}
                {modalType === 'organizer' && 'Become an Organizer'}
              </h3>
              <button 
                onClick={() => hideModal(modalType)}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form className="space-y-4">
              {(modalType === 'signup' || modalType === 'participant' || modalType === 'organizer') && (
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="Enter your full name"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Password</label>
                <input 
                  type="password" 
                  className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="Enter your password"
                />
              </div>
              
              {(modalType === 'participant' || modalType === 'organizer') && (
                <div>
                  <label className="block text-sm font-semibold mb-2">Primary Sport</label>
                  <select className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary">
                    <option>Basketball</option>
                    <option>Football</option>
                    <option>Tennis</option>
                    <option>Swimming</option>
                    <option>Running</option>
                    <option>Other</option>
                  </select>
                </div>
              )}
              
              <button className="w-full py-3 bg-gradient-primary text-white font-semibold rounded-lg hover:shadow-glow transition-all duration-300">
                {modalType === 'login' && 'Sign In'}
                {modalType === 'signup' && 'Create Account'}
                {modalType === 'participant' && 'Join Community'}
                {modalType === 'organizer' && 'Start Organizing'}
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Index;
