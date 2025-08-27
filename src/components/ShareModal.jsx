import { useState } from "react";
import { X, Share2, Copy, Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { cn } from "../lib/utils";

function ShareModal({ isOpen, onClose, shareUrl, cardName }) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
      // 降级方案
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cardName} - Business Card`,
          text: `View ${cardName}'s business card`,
          url: shareUrl,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Share failed:', error);
          // Fallback to copy link
          handleCopyLink();
        }
      }
    } else {
      // Native share not supported, copy link
      handleCopyLink();
    }
  };

  const handleDownloadQR = () => {
    const svg = document.querySelector('.share-modal svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      canvas.width = 200;
      canvas.height = 200;
      
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const link = document.createElement('a');
        link.download = `${cardName}-qrcode.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 share-modal overflow-hidden">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* 弹窗内容 */}
      <div className="relative bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl max-w-sm w-full mx-4 max-h-[calc(100vh-2rem)] overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* 装饰性背景 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-red-200/20 to-red-300/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-red-200/15 to-red-400/15 rounded-full blur-3xl"></div>
        </div>
        
        {/* 头部 */}
        <div className="relative p-6 pb-4 landscape:p-4 landscape:pb-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-red-900 landscape:text-lg">Share Business Card</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-white/50 hover:bg-white/70 transition-colors landscape:p-1.5"
            >
              <X className="w-5 h-5 text-red-700 landscape:w-4 landscape:h-4" />
            </button>
          </div>
          <p className="text-red-700 text-sm mt-1 landscape:text-xs landscape:mt-0.5">Scan QR code or share link</p>
        </div>
        
        {/* 二维码区域 */}
        <div className="relative px-6 pb-4 landscape:px-4 landscape:pb-2">
          <div className="bg-white rounded-2xl p-6 border border-red-100/50 shadow-lg landscape:p-4">
            <div className="flex justify-center">
              <QRCodeSVG 
                value={shareUrl}
                size={160}
                bgColor="#ffffff"
                fgColor="#DC2626"
                level="H"
                includeMargin={true}
                className="landscape:w-32 landscape:h-32"
              />
            </div>
            <p className="text-center text-xs text-slate-600 mt-3">
              {cardName}'s Business Card
            </p>
          </div>
        </div>
        
        {/* 分享按钮区域 */}
        <div className="relative p-6 pt-2 landscape:p-4 landscape:pt-1">
          <div className="space-y-3 landscape:space-y-2">
            {/* 原生分享按钮 */}
            <button 
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl landscape:p-3 landscape:space-x-2"
            >
              <Share2 className="w-5 h-5 landscape:w-4 landscape:h-4" />
              <span className="font-medium landscape:text-sm">Share Business Card</span>
            </button>
            
            {/* 辅助按钮 */}
            <div className="grid grid-cols-2 gap-3 landscape:gap-2">
              <button 
                onClick={handleCopyLink}
                className={cn(
                  "flex items-center justify-center space-x-2 p-3 rounded-xl border transition-all duration-300 landscape:p-2 landscape:space-x-1",
                  copySuccess 
                    ? "bg-green-50 border-green-200 text-green-700" 
                    : "bg-white/50 border-red-200/50 text-red-700 hover:bg-white/70"
                )}
              >
                <Copy className="w-4 h-4 landscape:w-3 landscape:h-3" />
                <span className="text-sm font-medium landscape:text-xs">
                  {copySuccess ? "Copied" : "Copy Link"}
                </span>
              </button>
              
              <button 
                onClick={handleDownloadQR}
                className="flex items-center justify-center space-x-2 p-3 bg-white/50 border border-red-200/50 text-red-700 rounded-xl hover:bg-white/70 transition-all duration-300 landscape:p-2 landscape:space-x-1"
              >
                <Download className="w-4 h-4 landscape:w-3 landscape:h-3" />
                <span className="text-sm font-medium landscape:text-xs">Download QR Code</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;