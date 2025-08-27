import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../../lib/utils';

const BusinessCard = ({ card }) => {
  const navigate = useNavigate();
  
  if (!card) return null;

  const {
    name,
    title,
    company,
    email,
    phone,
    location,
    website,
    linkedin,
    github,
    avatar,
    description,
    skills = [],
    path
  } = card;

  const handleCardClick = () => {
    if (path) {
      navigate(`/business-card/${path}`);
    }
  };

  return (
    <div className="group relative">
      {/* Card container with glassmorphism effect */}
      <div 
        onClick={handleCardClick}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl border border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 cursor-pointer"
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 via-transparent to-red-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Card content */}
        <div className="relative p-8 space-y-6">
          {/* Avatar and basic info */}
          <div className="text-center space-y-4">
            {avatar ? (
              <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden ring-4 ring-white/50 shadow-lg">
                <img 
                  src={avatar} 
                  alt={name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-2xl font-bold" style={{display: 'none'}}>
                  {name?.charAt(0)?.toUpperCase()}
                </div>
              </div>
            ) : (
              <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-2xl font-bold ring-4 ring-white/50 shadow-lg">
                {name?.charAt(0)?.toUpperCase()}
              </div>
            )}
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-red-900 tracking-tight">{name}</h3>
              <p className="text-red-700 font-medium">{title}</p>
              {company && (
                <p className="text-red-600 text-sm">{company}</p>
              )}
            </div>
          </div>

          {/* Description */}
          {description && (
            <div className="text-center">
              <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-red-800 uppercase tracking-wide">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 text-xs font-medium bg-red-100/80 text-red-700 rounded-full border border-red-200/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contact information */}
          <div className="space-y-3 pt-4 border-t border-red-100/50">
            {email && (
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-red-600 flex-shrink-0" />
                <a 
                  href={`mailto:${email}`}
                  className="text-slate-600 hover:text-red-700 transition-colors truncate"
                >
                  {email}
                </a>
              </div>
            )}
            
            {phone && (
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-red-600 flex-shrink-0" />
                <a 
                  href={`tel:${phone}`}
                  className="text-slate-600 hover:text-red-700 transition-colors"
                >
                  {phone}
                </a>
              </div>
            )}
            
            {location && (
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span className="text-slate-600">{location}</span>
              </div>
            )}
          </div>

          {/* Social links */}
          {(website || linkedin || github) && (
            <div className="flex justify-center space-x-4 pt-4">
              {website && (
                <a 
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/50 hover:bg-white/80 border border-white/50 hover:border-red-200 transition-all duration-300 group/icon"
                >
                  <Globe className="w-4 h-4 text-red-600 group-hover/icon:text-red-700" />
                </a>
              )}
              
              {linkedin && (
                <a 
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/50 hover:bg-white/80 border border-white/50 hover:border-red-200 transition-all duration-300 group/icon"
                >
                  <Linkedin className="w-4 h-4 text-red-600 group-hover/icon:text-red-700" />
                </a>
              )}
              
              {github && (
                <a 
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/50 hover:bg-white/80 border border-white/50 hover:border-red-200 transition-all duration-300 group/icon"
                >
                  <Github className="w-4 h-4 text-red-600 group-hover/icon:text-red-700" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;