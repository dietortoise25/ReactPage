import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Download,
  Share2,
} from "lucide-react";
import { cn } from "../../lib/utils";
import ShareModal from "../../components/ShareModal";

// Contact Item Component for consistent formatting
const ContactItem = ({
  href,
  icon: Icon,
  value,
  isExternal = false,
}) => {
  const Component = href ? "a" : "div";
  const props = href
    ? {
        href,
        ...(isExternal && { target: "_blank", rel: "noopener noreferrer" }),
      }
    : {};

  return (
    <Component
      {...props}
      className={`flex items-center space-x-3 p-3 bg-white/50 rounded-xl border border-white/50 ${
        href ? "hover:bg-white/70 transition-all duration-300 group" : ""
      }`}
    >
      <div
        className={`p-2 bg-red-100 rounded-full ${
          href ? "group-hover:bg-red-200 transition-colors" : ""
        }`}
      >
        <Icon className="w-4 h-4 text-red-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-slate-700 text-sm md:text-base lg:text-lg truncate font-medium">{value}</p>
      </div>
    </Component>
  );
};

function BusinessCardDetailPage() {
  const { path } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch("/business_cards.json");
        const data = await response.json();
        const foundCard = data.cards?.find((c) => c.path === path);
        setCard(foundCard || null);
      } catch (error) {
        setCard(null);
        console.error("Error fetching card:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [path]);

  const handleBackClick = () => {
    navigate("/business-card");
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-red-300 border-t-red-600"></div>
          </div>
          <p className="text-red-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center space-y-4 p-6">
          <h2 className="text-2xl font-bold text-red-900">
            Business Card Not Found
          </h2>
          <p className="text-red-700">
            Sorry, the business card information could not be found
          </p>
          <button
            onClick={handleBackClick}
            className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            Back to Business Cards
          </button>
        </div>
      </div>
    );
  }

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
  } = card;

  return (
    <div className="h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex flex-col overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-200/20 to-red-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-200/15 to-red-400/15 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 flex items-center justify-between landscape:p-2">
        <button
          onClick={handleBackClick}
          className="p-3 rounded-full bg-white/80 backdrop-blur-md border border-white/50 hover:bg-white/90 transition-all duration-300 shadow-lg landscape:p-2"
        >
          <ArrowLeft className="w-5 h-5 text-red-700 landscape:w-4 landscape:h-4" />
        </button>

        {/* Company Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="/logo.svg"
            alt="Company Logo"
            className="h-8 w-auto landscape:h-6"
          />
          <span className="text-red-800 font-semibold text-sm hidden sm:inline"></span>
        </div>

        <button
          onClick={handleShare}
          className="p-3 rounded-full bg-white/80 backdrop-blur-md border border-white/50 hover:bg-white/90 transition-all duration-300 shadow-lg landscape:p-2"
        >
          <Share2 className="w-5 h-5 text-red-700 landscape:w-4 landscape:h-4" />
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-hidden">
        <div className="h-full px-2 py-2 landscape:px-2 landscape:py-0.5">
          {/* Portrait Layout */}
          <div className="max-w-md mx-auto h-full flex flex-col justify-between landscape:hidden">
            {/* Profile Card */}
            <div className="bg-gradient-to-br from-white/90 via-white/80 to-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl overflow-hidden mb-2">
              {/* Profile Header */}
              <div className="relative p-4 text-center">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-transparent to-red-100/30"></div>

                <div className="relative space-y-2">
                  {/* Avatar */}
                  {avatar ? (
                    <div className="relative mx-auto w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/70 shadow-lg">
                      <img
                        src={avatar}
                        alt={name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-lg font-bold"
                        style={{ display: "none" }}
                      >
                        {name?.charAt(0)?.toUpperCase()}
                      </div>
                    </div>
                  ) : (
                    <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-lg font-bold ring-2 ring-white/70 shadow-lg">
                      {name?.charAt(0)?.toUpperCase()}
                    </div>
                  )}

                  {/* Basic Info */}
                  <div className="space-y-1">
                    <h1 className="text-xl font-bold text-red-900 tracking-tight">
                      {name}
                    </h1>
                    <p className="text-sm text-red-700 font-medium">{title}</p>
                    <p className="text-xs text-red-600">{company}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              {description && (
                <div className="px-4 pb-3">
                  <div className="bg-red-50/50 rounded-xl p-2 border border-red-100/50">
                    <p className="text-slate-700 text-xs text-center leading-tight">
                      {description}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Main Content Grid */}
            <div className="flex-1 grid grid-cols-1 gap-2">
              {/* Contact Information */}
              <div className="bg-gradient-to-br from-white/90 via-white/80 to-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl p-4">
                <div className="space-y-2">
                  {email && (
                    <ContactItem
                      href={`mailto:${email}`}
                      icon={Mail}
                      value={email}
                    />
                  )}

                  {phone && (
                    <ContactItem
                      href={`tel:${phone}`}
                      icon={Phone}
                      value={phone}
                    />
                  )}

                  {location && (
                    <ContactItem
                      icon={MapPin}
                      value={location}
                    />
                  )}

                  {website && (
                    <ContactItem
                      href={website}
                      icon={Globe}
                      value={website}
                      isExternal={true}
                    />
                  )}

                  {linkedin && (
                    <ContactItem
                      href={linkedin}
                      icon={Linkedin}
                      value={linkedin}
                      isExternal={true}
                    />
                  )}

                  {github && (
                    <ContactItem
                      href={github}
                      icon={Github}
                      value={github}
                      isExternal={true}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Landscape Layout */}
          <div className="hidden landscape:flex h-full max-w-6xl mx-auto gap-2">
            {/* Left Panel - Profile */}
            <div className="flex-1 flex flex-col h-full">
              <div className="bg-gradient-to-br from-white/90 via-white/80 to-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl overflow-hidden h-full flex flex-col justify-center">
                {/* Profile Header */}
                <div className="relative p-3 text-center">
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-transparent to-red-100/30"></div>

                  <div className="relative space-y-2">
                    {/* Avatar */}
                    {avatar ? (
                      <div className="relative mx-auto w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/70 shadow-lg">
                        <img
                          src={avatar}
                          alt={name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-lg font-bold"
                          style={{ display: "none" }}
                        >
                          {name?.charAt(0)?.toUpperCase()}
                        </div>
                      </div>
                    ) : (
                      <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-lg font-bold ring-2 ring-white/70 shadow-lg">
                        {name?.charAt(0)?.toUpperCase()}
                      </div>
                    )}

                    {/* Basic Info */}
                    <div className="space-y-1">
                      <h1 className="text-lg font-bold text-red-900 tracking-tight">
                        {name}
                      </h1>
                      <p className="text-sm text-red-700 font-medium">
                        {title}
                      </p>
                      <p className="text-xs text-red-600">{company}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {description && (
                  <div className="px-3 pb-3">
                    <div className="bg-red-50/50 rounded-xl p-2 border border-red-100/50">
                      <p className="text-slate-700 text-xs text-center leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Details */}
            <div className="flex-1 flex flex-col h-full">
              <div className="grid grid-cols-1 gap-2 h-full justify-items-stretch content-stretch">
                {/* Contact Information */}
                <div className="bg-gradient-to-br from-white/90 via-white/80 to-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl p-3">
                  <div className="space-y-1">
                    {email && (
                      <ContactItem
                        href={`mailto:${email}`}
                        icon={Mail}
                        value={email}
                      />
                    )}

                    {phone && (
                      <ContactItem
                        href={`tel:${phone}`}
                        icon={Phone}
                        value={phone}
                      />
                    )}

                    {location && (
                      <ContactItem
                        icon={MapPin}
                        value={location}
                      />
                    )}

                    {website && (
                      <ContactItem
                        href={website}
                        icon={Globe}
                        value={website}
                        isExternal={true}
                      />
                    )}

                    {linkedin && (
                      <ContactItem
                        href={linkedin}
                        icon={Linkedin}
                        value={linkedin}
                        isExternal={true}
                      />
                    )}

                    {github && (
                      <ContactItem
                        href={github}
                        icon={Github}
                        value={github}
                        isExternal={true}
                      />
                    )}
                  </div>
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                  <div className="bg-gradient-to-br from-white/90 via-white/80 to-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl p-2">
                    <h2 className="text-sm font-bold text-red-900 mb-1 text-center">
                      Professional Skills
                    </h2>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gradient-to-r from-red-100 to-red-50 text-red-700 rounded-full border border-red-200/50 font-medium text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* 分享弹窗 */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        shareUrl={window.location.href}
        cardName={card?.name || ""}
      />
    </div>
  );
}

export default BusinessCardDetailPage;
