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

function BusinessCardDetailPage() {
  const { path } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleShare = async () => {
    if (navigator.share && card) {
      try {
        await navigator.share({
          title: `${card.name} - ${card.title}`,
          text: `查看${card.name}的个人名片`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("分享失败:", error);
      }
    } else {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href);
      alert("链接已复制到剪贴板");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-red-300 border-t-red-600"></div>
          </div>
          <p className="text-red-700 font-medium">加载中...</p>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center space-y-4 p-6">
          <h2 className="text-2xl font-bold text-red-900">名片未找到</h2>
          <p className="text-red-700">抱歉，找不到该名片信息</p>
          <button
            onClick={handleBackClick}
            className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            返回名片列表
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-200/20 to-red-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-200/15 to-red-400/15 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 flex items-center justify-between">
        <button
          onClick={handleBackClick}
          className="p-3 rounded-full bg-white/80 backdrop-blur-md border border-white/50 hover:bg-white/90 transition-all duration-300 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 text-red-700" />
        </button>

        {/* Company Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="/logo.svg"
            alt="Company Logo"
            className="h-8 w-auto"
          />
          <span className="text-red-800 font-semibold text-sm hidden sm:inline"></span>
        </div>

        <button
          onClick={handleShare}
          className="p-3 rounded-full bg-white/80 backdrop-blur-md border border-white/50 hover:bg-white/90 transition-all duration-300 shadow-lg"
        >
          <Share2 className="w-5 h-5 text-red-700" />
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 pb-8">
        <div className="max-w-md mx-auto">
          {/* Profile Card */}
          <div className="bg-gradient-to-br from-white/90 via-white/80 to-white/70 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl overflow-hidden mb-6">
            {/* Profile Header */}
            <div className="relative p-8 text-center">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-transparent to-red-100/30"></div>

              <div className="relative space-y-4">
                {/* Avatar */}
                {avatar ? (
                  <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden ring-4 ring-white/70 shadow-xl">
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
                      className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-4xl font-bold"
                      style={{ display: "none" }}
                    >
                      {name?.charAt(0)?.toUpperCase()}
                    </div>
                  </div>
                ) : (
                  <div className="mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-4xl font-bold ring-4 ring-white/70 shadow-xl">
                    {name?.charAt(0)?.toUpperCase()}
                  </div>
                )}

                {/* Basic Info */}
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-red-900 tracking-tight">
                    {name}
                  </h1>
                  <p className="text-xl text-red-700 font-medium">{title}</p>
                  <p className="text-red-600">{company}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {description && (
              <div className="px-8 pb-6">
                <div className="bg-red-50/50 rounded-2xl p-4 border border-red-100/50">
                  <p className="text-slate-700 leading-relaxed text-center">
                    {description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-br from-white/90 via-white/80 to-white/70 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-6 mb-6">
            <h2 className="text-xl font-bold text-red-900 mb-4 text-center">
              联系方式
            </h2>
            <div className="space-y-4">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center space-x-4 p-4 bg-white/50 rounded-2xl border border-white/50 hover:bg-white/70 transition-all duration-300 group"
                >
                  <div className="p-2 bg-red-100 rounded-full group-hover:bg-red-200 transition-colors">
                    <Mail className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-red-800">邮箱</p>
                    <p className="text-slate-600 truncate">{email}</p>
                  </div>
                </a>
              )}

              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center space-x-4 p-4 bg-white/50 rounded-2xl border border-white/50 hover:bg-white/70 transition-all duration-300 group"
                >
                  <div className="p-2 bg-red-100 rounded-full group-hover:bg-red-200 transition-colors">
                    <Phone className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-800">电话</p>
                    <p className="text-slate-600">{phone}</p>
                  </div>
                </a>
              )}

              {location && (
                <div className="flex items-center space-x-4 p-4 bg-white/50 rounded-2xl border border-white/50">
                  <div className="p-2 bg-red-100 rounded-full">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-800">位置</p>
                    <p className="text-slate-600">{location}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="bg-gradient-to-br from-white/90 via-white/80 to-white/70 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-6 mb-6">
              <h2 className="text-xl font-bold text-red-900 mb-4 text-center">
                专业技能
              </h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-red-100 to-red-50 text-red-700 rounded-full border border-red-200/50 font-medium text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {(website || linkedin || github) && (
            <div className="bg-gradient-to-br from-white/90 via-white/80 to-white/70 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-6">
              <h2 className="text-xl font-bold text-red-900 mb-4 text-center">
                社交链接
              </h2>
              <div className="space-y-3">
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 bg-white/50 rounded-2xl border border-white/50 hover:bg-white/70 transition-all duration-300 group"
                  >
                    <div className="p-2 bg-red-100 rounded-full group-hover:bg-red-200 transition-colors">
                      <Globe className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-800">网站</p>
                      <p className="text-slate-600 text-sm truncate">
                        {website}
                      </p>
                    </div>
                  </a>
                )}

                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 bg-white/50 rounded-2xl border border-white/50 hover:bg-white/70 transition-all duration-300 group"
                  >
                    <div className="p-2 bg-red-100 rounded-full group-hover:bg-red-200 transition-colors">
                      <Linkedin className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-800">
                        LinkedIn
                      </p>
                      <p className="text-slate-600 text-sm truncate">
                        {linkedin}
                      </p>
                    </div>
                  </a>
                )}

                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 bg-white/50 rounded-2xl border border-white/50 hover:bg-white/70 transition-all duration-300 group"
                  >
                    <div className="p-2 bg-red-100 rounded-full group-hover:bg-red-200 transition-colors">
                      <Github className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-800">GitHub</p>
                      <p className="text-slate-600 text-sm truncate">
                        {github}
                      </p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default BusinessCardDetailPage;
