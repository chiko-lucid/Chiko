import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  Plus,
  Trash2,
  RefreshCw,
  Star,
  HelpCircle,
  Mail,
  User,
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  Layers,
  Edit2,
  Check,
  ArrowUp,
  ArrowDown,
  Sparkles,
} from 'lucide-react';
import { PortfolioCategory, PortfolioItem } from '../types';

export const AdminModal: React.FC = () => {
  const {
    profile,
    portfolioItems,
    faqs,
    inquiries,
    isAdminOpen,
    setIsAdminOpen,
    updateProfile,
    toggleStatus,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
    addFAQ,
    deleteFAQ,
    deleteInquiry,
    resetToDefault,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'works' | 'profile' | 'faqs' | 'inquiries'>('works');

  // Editing state
  const [editingWorkId, setEditingWorkId] = useState<string | null>(null);

  // Work Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<Exclude<PortfolioCategory, 'ALL'>>('Commercial');
  const [newIsBest, setNewIsBest] = useState(false);
  const [newTags, setNewTags] = useState('Character, Concept');
  const [newYear, setNewYear] = useState('2025');
  const [newClient, setNewClient] = useState('');
  const [newTools, setNewTools] = useState('Clip Studio Paint, Photoshop');
  const [newDuration, setNewDuration] = useState('2 weeks');
  const [newPurpose, setNewPurpose] = useState('Key Art');
  const [newDesc, setNewDesc] = useState('');

  // Multi-image state & computer file upload
  const [imagesList, setImagesList] = useState<string[]>([]);
  const [coverIndex, setCoverIndex] = useState<number>(0);
  const [urlInput, setUrlInput] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // New FAQ State
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  // Profile Form States
  const [profName, setProfName] = useState(profile.name || '');
  const [profRole, setProfRole] = useState(profile.role || '');
  const [profSubtitle, setProfSubtitle] = useState(profile.subtitle || '');
  const [profBioText, setProfBioText] = useState(profile.bioLines ? profile.bioLines.join('\n') : '');
  const [profResponseTime, setProfResponseTime] = useState(profile.responseTime || '24시간 이내');
  const [profAvatarUrl, setProfAvatarUrl] = useState(profile.avatarUrl || '');
  const [profExpYears, setProfExpYears] = useState(profile.experienceYears || 5);
  const [profCompletedCommissions, setProfCompletedCommissions] = useState(profile.completedCommissions || 120);
  const [profRepeatRate, setProfRepeatRate] = useState(profile.repeatClientRate || 30);
  const [profSatisfactionRate, setProfSatisfactionRate] = useState(profile.satisfactionRate || 98);
  const [profSkillsText, setProfSkillsText] = useState(
    profile.skills ? profile.skills.map((s) => s.name).join(', ') : ''
  );
  const [profScopesText, setProfScopesText] = useState(
    profile.commercialScopes ? profile.commercialScopes.join('\n') : ''
  );
  const [profEmail, setProfEmail] = useState(profile.socialLinks?.email || '');
  const [profDiscord, setProfDiscord] = useState(profile.socialLinks?.discord || '');
  const [profOpenKakao, setProfOpenKakao] = useState(profile.socialLinks?.openKakao || '');
  const [profTwitter, setProfTwitter] = useState(profile.socialLinks?.twitter || '');
  const [profPixiv, setProfPixiv] = useState(profile.socialLinks?.pixiv || '');

  React.useEffect(() => {
    if (profile) {
      setProfName(profile.name || '');
      setProfRole(profile.role || '');
      setProfSubtitle(profile.subtitle || '');
      setProfBioText(profile.bioLines ? profile.bioLines.join('\n') : '');
      setProfResponseTime(profile.responseTime || '24시간 이내');
      setProfAvatarUrl(profile.avatarUrl || '');
      setProfExpYears(profile.experienceYears || 5);
      setProfCompletedCommissions(profile.completedCommissions || 120);
      setProfRepeatRate(profile.repeatClientRate || 30);
      setProfSatisfactionRate(profile.satisfactionRate || 98);
      setProfSkillsText(
        profile.skills ? profile.skills.map((s) => s.name).join(', ') : ''
      );
      setProfScopesText(
        profile.commercialScopes ? profile.commercialScopes.join('\n') : ''
      );
      setProfEmail(profile.socialLinks?.email || '');
      setProfDiscord(profile.socialLinks?.discord || '');
      setProfOpenKakao(profile.socialLinks?.openKakao || '');
      setProfTwitter(profile.socialLinks?.twitter || '');
      setProfPixiv(profile.socialLinks?.pixiv || '');
    }
  }, [profile, isAdminOpen]);

  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setProfAvatarUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    const bioLinesArray = profBioText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const scopesArray = profScopesText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const skillsArray = profSkillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((name) => ({ name, category: 'Skill' }));

    updateProfile({
      name: profName,
      role: profRole,
      subtitle: profSubtitle,
      bioLines: bioLinesArray.length > 0 ? bioLinesArray : profile.bioLines,
      responseTime: profResponseTime,
      avatarUrl: profAvatarUrl,
      experienceYears: Number(profExpYears) || 0,
      completedCommissions: Number(profCompletedCommissions) || 0,
      repeatClientRate: Number(profRepeatRate) || 0,
      satisfactionRate: Number(profSatisfactionRate) || 0,
      skills: skillsArray.length > 0 ? skillsArray : profile.skills,
      commercialScopes: scopesArray.length > 0 ? scopesArray : profile.commercialScopes,
      socialLinks: {
        ...profile.socialLinks,
        email: profEmail,
        discord: profDiscord,
        openKakao: profOpenKakao,
        twitter: profTwitter,
        pixiv: profPixiv,
      },
    });

    alert('작가 프로필 및 소개글 정보가 성공적으로 반영되었습니다!');
  };

  if (!isAdminOpen) return null;

  const resetWorkForm = () => {
    setEditingWorkId(null);
    setNewTitle('');
    setNewCategory('Commercial');
    setNewIsBest(false);
    setNewTags('Character, Concept');
    setNewYear('2025');
    setNewClient('');
    setNewTools('Clip Studio Paint, Photoshop');
    setNewDuration('2 weeks');
    setNewPurpose('Key Art');
    setNewDesc('');
    setImagesList([]);
    setCoverIndex(0);
    setUrlInput('');
  };

  // Computer Local File Upload Handler
  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const newBase64Images: string[] = [];
    let loadedCount = 0;

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newBase64Images.push(event.target.result as string);
        }
        loadedCount++;
        if (loadedCount === fileArray.length) {
          setImagesList((prev) => [...prev, ...newBase64Images]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddUrlImage = () => {
    if (!urlInput.trim()) return;
    setImagesList((prev) => [...prev, urlInput.trim()]);
    setUrlInput('');
  };

  const handleRemoveImage = (index: number) => {
    setImagesList((prev) => prev.filter((_, i) => i !== index));
    if (coverIndex >= index && coverIndex > 0) {
      setCoverIndex((prev) => prev - 1);
    }
  };

  const handleMoveImage = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === imagesList.length - 1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...imagesList];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;

    setImagesList(updated);

    if (coverIndex === index) setCoverIndex(newIndex);
    else if (coverIndex === newIndex) setCoverIndex(index);
  };

  const handleSaveWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert('Please enter artwork title.');
      return;
    }

    if (imagesList.length === 0) {
      alert('Please upload or add at least one image for the artwork.');
      return;
    }

    const primaryImageUrl = imagesList[coverIndex] || imagesList[0];
    // Create ordered images list putting cover first or maintaining list
    const finalImagesList = Array.from(new Set([primaryImageUrl, ...imagesList]));

    if (editingWorkId) {
      updatePortfolioItem(editingWorkId, {
        title: newTitle,
        category: newCategory,
        imageUrl: primaryImageUrl,
        images: finalImagesList,
        isBestWork: newIsBest,
        tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
        year: newYear,
        client: newClient || undefined,
        tools: newTools.split(',').map((t) => t.trim()).filter(Boolean),
        duration: newDuration,
        purpose: newPurpose,
        description: newDesc || 'Portfolio artwork entry.',
      });
      alert('Artwork updated successfully.');
    } else {
      addPortfolioItem({
        title: newTitle,
        category: newCategory,
        imageUrl: primaryImageUrl,
        images: finalImagesList,
        isBestWork: newIsBest,
        tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
        year: newYear,
        client: newClient || undefined,
        tools: newTools.split(',').map((t) => t.trim()).filter(Boolean),
        duration: newDuration,
        purpose: newPurpose,
        description: newDesc || 'New portfolio artwork entry.',
      });
      alert('New portfolio item registered.');
    }

    resetWorkForm();
  };

  const handleStartEdit = (work: PortfolioItem) => {
    setEditingWorkId(work.id);
    setNewTitle(work.title);
    setNewCategory(work.category);
    setNewIsBest(work.isBestWork);
    setNewTags(work.tags.join(', '));
    setNewYear(work.year);
    setNewClient(work.client || '');
    setNewTools(work.tools.join(', '));
    setNewDuration(work.duration);
    setNewPurpose(work.purpose);
    setNewDesc(work.description);

    const existingImages = work.images && work.images.length > 0
      ? Array.from(new Set([work.imageUrl, ...work.images]))
      : [work.imageUrl];

    setImagesList(existingImages);
    setCoverIndex(0);
  };

  const handleCreateFAQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    addFAQ({
      question: newQuestion,
      answer: newAnswer,
      category: 'General',
    });

    setNewQuestion('');
    setNewAnswer('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      
      {/* Background click */}
      <div className="fixed inset-0" onClick={() => setIsAdminOpen(false)} />

      {/* Modal Box */}
      <div className="relative w-full max-w-5xl bg-[#0F0F12] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-10 my-6 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0A0A0B] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-white/10 text-white border border-white/20 flex items-center justify-center font-bold text-xs">
              ⚙
            </div>
            <div>
              <h2 className="font-serif text-base text-white">Portfolio Admin Portal</h2>
              <p className="text-[11px] text-white/40 font-light">Real-time artwork management, computer file upload, multi-image manager</p>
            </div>
          </div>

          {/* Availability Status Quick Switcher */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleStatus}
              className={`px-3 py-1.5 rounded-sm text-xs border transition-all flex items-center gap-1.5 ${
                profile.status === 'AVAILABLE'
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${profile.status === 'AVAILABLE' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
              <span className="font-light text-xs">{profile.status === 'AVAILABLE' ? 'Open for Work' : 'Bookings Closed'}</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2 bg-[#0A0A0B] border-b border-white/10 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('works')}
            className={`px-4 py-2 rounded-sm text-xs font-serif transition-all flex items-center gap-1.5 ${
              activeTab === 'works'
                ? 'bg-white text-black font-bold'
                : 'bg-[#1A1A1F] text-white/60 hover:text-white border border-white/10'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Works ({portfolioItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-sm text-xs font-serif transition-all flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'bg-white text-black font-bold'
                : 'bg-[#1A1A1F] text-white/60 hover:text-white border border-white/10'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile Specs</span>
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-4 py-2 rounded-sm text-xs font-serif transition-all flex items-center gap-1.5 ${
              activeTab === 'faqs'
                ? 'bg-white text-black font-bold'
                : 'bg-[#1A1A1F] text-white/60 hover:text-white border border-white/10'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ Items ({faqs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded-sm text-xs font-serif transition-all flex items-center gap-1.5 ${
              activeTab === 'inquiries'
                ? 'bg-white text-black font-bold'
                : 'bg-[#1A1A1F] text-white/60 hover:text-white border border-white/10'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Inquiries ({inquiries.length})</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: Portfolio Works Manager */}
          {activeTab === 'works' && (
            <div className="space-y-8">
              
              {/* Form: Add or Edit Work */}
              <form onSubmit={handleSaveWork} className="p-5 rounded-lg bg-[#1A1A1F] border border-white/10 space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="font-serif text-sm text-white flex items-center gap-2">
                    {editingWorkId ? (
                      <>
                        <Edit2 className="w-4 h-4 text-amber-300" />
                        <span>Edit Portfolio Artwork</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 text-white/60" />
                        <span>Register New Artwork</span>
                      </>
                    )}
                  </h3>

                  {editingWorkId && (
                    <button
                      type="button"
                      onClick={resetWorkForm}
                      className="text-xs text-white/50 hover:text-white underline"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cyber Dragon Girl"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white placeholder-white/30"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e: any) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white"
                    >
                      <option value="Commercial">Commercial</option>
                      <option value="Original">Original</option>
                      <option value="Live2D">Live2D</option>
                      <option value="Character Design">Character Design</option>
                      <option value="Fan Art">Fan Art</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">Tags (Comma Separated)</label>
                    <input
                      type="text"
                      placeholder="Game, Cyberpunk, 2025"
                      value={newTags}
                      onChange={(e) => setNewTags(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white placeholder-white/30"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">Year</label>
                    <input
                      type="text"
                      placeholder="2025"
                      value={newYear}
                      onChange={(e) => setNewYear(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white placeholder-white/30"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">Client / Project</label>
                    <input
                      type="text"
                      placeholder="e.g. Studio A"
                      value={newClient}
                      onChange={(e) => setNewClient(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white placeholder-white/30"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">Best Work Assignment</label>
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="newIsBest"
                        checked={newIsBest}
                        onChange={(e) => setNewIsBest(e.target.checked)}
                        className="w-4 h-4 rounded-sm bg-[#0A0A0B] border-white/20 text-white"
                      />
                      <label htmlFor="newIsBest" className="text-xs text-white/80 font-serif">
                        Set as Best Work
                      </label>
                    </div>
                  </div>
                </div>

                {/* Computer Image Upload & Multi-Image Gallery Manager Section */}
                <div className="p-4 rounded-md bg-[#0A0A0B] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-serif text-white flex items-center gap-1.5">
                      <Upload className="w-4 h-4 text-white/70" />
                      <span>Upload & Add Multiple Portfolio Images (내 컴퓨터 파일 업로드 / 여러 장 지원)</span>
                    </label>
                    <span className="text-[10px] text-white/50 font-light">
                      Attached: <strong className="text-white">{imagesList.length}</strong> photo(s)
                    </span>
                  </div>

                  {/* Dual Upload Options: Computer File Drag-Drop vs Image URL */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    
                    {/* Option A: Local Computer File Selector & Dropzone */}
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        handleFileUpload(e.dataTransfer.files);
                      }}
                      className={`relative border-2 border-dashed p-4 rounded-sm text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                        isDragging
                          ? 'border-white bg-white/10'
                          : 'border-white/20 hover:border-white/40 bg-[#0F0F12]'
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                      />
                      <Upload className="w-5 h-5 text-white/70 mb-1" />
                      <span className="text-xs font-semibold text-white">Choose Images from Computer</span>
                      <span className="text-[10px] text-white/40 mt-0.5 font-light">
                        Click or drag & drop files here (Supports PNG, JPG, WEBP)
                      </span>
                    </div>

                    {/* Option B: External Image URL Add */}
                    <div className="p-4 rounded-sm bg-[#0F0F12] border border-white/10 flex flex-col justify-between space-y-2">
                      <label className="text-[10px] uppercase tracking-wider text-white/60 block">
                        Or Add Web Image URL
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="https://images.unsplash.com/..."
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          className="flex-1 px-3 py-1.5 bg-[#0A0A0B] border border-white/10 text-xs text-white rounded-sm placeholder-white/30"
                        />
                        <button
                          type="button"
                          onClick={handleAddUrlImage}
                          className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold rounded-sm flex items-center gap-1 whitespace-nowrap"
                        >
                          <LinkIcon className="w-3 h-3" />
                          <span>Add URL</span>
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Thumbnails Manager Grid */}
                  {imagesList.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <span className="text-[10px] uppercase tracking-wider text-white/50 block font-semibold">
                        Image Preview & Cover Selection (Click "Cover" to set primary display image)
                      </span>

                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                        {imagesList.map((imgUrl, idx) => {
                          const isCover = coverIndex === idx;

                          return (
                            <div
                              key={idx}
                              className={`relative group rounded-md overflow-hidden border bg-[#1A1A1F] aspect-square flex flex-col justify-between p-1 transition-all ${
                                isCover ? 'border-amber-300 ring-2 ring-amber-300/40' : 'border-white/10'
                              }`}
                            >
                              <img
                                src={imgUrl}
                                alt={`Uploaded ${idx + 1}`}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover rounded-sm absolute inset-0"
                              />

                              {/* Top Bar Badges */}
                              <div className="relative z-10 flex items-center justify-between">
                                {isCover ? (
                                  <span className="px-1.5 py-0.5 rounded-sm bg-amber-300 text-black text-[9px] font-bold uppercase shadow">
                                    COVER
                                  </span>
                                ) : (
                                  <span className="px-1.5 py-0.5 rounded-sm bg-black/60 text-white text-[9px] font-light">
                                    #{idx + 1}
                                  </span>
                                )}

                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(idx)}
                                  className="p-1 rounded-sm bg-rose-500/80 hover:bg-rose-600 text-white shadow"
                                  title="Remove image"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>

                              {/* Hover Control Overlay */}
                              <div className="relative z-10 mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 p-1 flex items-center justify-between gap-1 rounded-sm">
                                {!isCover && (
                                  <button
                                    type="button"
                                    onClick={() => setCoverIndex(idx)}
                                    className="px-2 py-0.5 rounded-sm bg-amber-300 hover:bg-amber-200 text-black text-[9px] font-bold uppercase w-full"
                                  >
                                    Set Cover
                                  </button>
                                )}

                                <div className="flex items-center gap-0.5 ml-auto">
                                  <button
                                    type="button"
                                    onClick={() => handleMoveImage(idx, 'up')}
                                    disabled={idx === 0}
                                    className="p-1 rounded bg-white/10 text-white disabled:opacity-30"
                                    title="Move left"
                                  >
                                    <ArrowUp className="w-2.5 h-2.5 -rotate-90" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleMoveImage(idx, 'down')}
                                    disabled={idx === imagesList.length - 1}
                                    className="p-1 rounded bg-white/10 text-white disabled:opacity-30"
                                    title="Move right"
                                  >
                                    <ArrowDown className="w-2.5 h-2.5 -rotate-90" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">Artwork Description</label>
                  <textarea
                    rows={2}
                    placeholder="Description, lore, lighting technique details..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full px-3 py-2 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white resize-none placeholder-white/30"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-sm bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center gap-1.5"
                  >
                    {editingWorkId ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Save Artwork Changes</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Register Artwork</span>
                      </>
                    )}
                  </button>

                  {editingWorkId && (
                    <button
                      type="button"
                      onClick={resetWorkForm}
                      className="px-4 py-2 rounded-sm bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-serif"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              {/* Existing Works List */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Registered Artworks ({portfolioItems.length})
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {portfolioItems.map((work) => {
                    const multiCount = work.images && work.images.length > 0 ? work.images.length : 1;

                    return (
                      <div
                        key={work.id}
                        className={`p-3.5 rounded-lg border flex items-center justify-between gap-3 transition-colors ${
                          editingWorkId === work.id
                            ? 'bg-[#1F1F28] border-amber-300/50'
                            : 'bg-[#1A1A1F] border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <img
                            src={work.imageUrl}
                            alt={work.title}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-sm object-cover shrink-0 bg-[#0A0A0B]"
                          />
                          <div className="overflow-hidden">
                            <h5 className="font-serif text-xs text-white truncate">{work.title}</h5>
                            <div className="flex items-center gap-2 text-[10px] text-white/40 mt-0.5">
                              <span>{work.category} · {work.year}</span>
                              {multiCount > 1 && (
                                <span className="px-1.5 py-0.2 rounded bg-white/10 text-white/80 font-bold flex items-center gap-0.5">
                                  <Layers className="w-2.5 h-2.5" />
                                  <span>{multiCount}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Edit Artwork Button */}
                          <button
                            type="button"
                            onClick={() => handleStartEdit(work)}
                            className="p-1.5 rounded-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs"
                            title="Edit Artwork & Images"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Toggle Best Work Badge */}
                          <button
                            type="button"
                            onClick={() =>
                              updatePortfolioItem(work.id, { isBestWork: !work.isBestWork })
                            }
                            className={`p-1.5 rounded-sm border text-[10px] font-bold flex items-center gap-1 ${
                              work.isBestWork
                                ? 'bg-amber-300 text-black border-amber-300'
                                : 'bg-white/5 text-white/40 border-white/10'
                            }`}
                            title="Toggle Best Work"
                          >
                            <Star className={`w-3 h-3 ${work.isBestWork ? 'fill-black' : ''}`} />
                            <span>BEST</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => deletePortfolioItem(work.id)}
                            className="p-1.5 rounded-sm bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Artist Profile Editor */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              
              {/* 1. Basic Info & Profile Picture */}
              <div className="p-5 rounded-lg bg-[#1A1A1F] border border-white/10 space-y-4">
                <h4 className="font-serif text-sm text-amber-300 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>기본 정보 및 프로필 아바타 이미지</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">
                      작가 이름 (Artist Name) *
                    </label>
                    <input
                      type="text"
                      required
                      value={profName}
                      onChange={(e) => setProfName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white"
                      placeholder="e.g. 치코 (Chiko)"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">
                      직함 / 분야 (Title / Role)
                    </label>
                    <input
                      type="text"
                      value={profRole}
                      onChange={(e) => setProfRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white"
                      placeholder="Character Illustrator & Live2D Designer"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">
                      슬로건 / 한 줄 문구 (Tagline)
                    </label>
                    <input
                      type="text"
                      value={profSubtitle}
                      onChange={(e) => setProfSubtitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white"
                      placeholder="감정과 서사를 담은 캐릭터를 그립니다."
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">
                      평균 답변 및 응답 시간
                    </label>
                    <input
                      type="text"
                      value={profResponseTime}
                      onChange={(e) => setProfResponseTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white"
                      placeholder="24시간 이내"
                    />
                  </div>
                </div>

                {/* Avatar Image Selection */}
                <div className="pt-2 border-t border-white/10 space-y-3">
                  <label className="text-[10px] uppercase tracking-wider text-white/60 block">
                    프로필 사진 / 아바타 이미지
                  </label>
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden border border-white/20 bg-[#0A0A0B] shrink-0">
                      {profAvatarUrl ? (
                        <img
                          src={profAvatarUrl}
                          alt="Avatar preview"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">
                          No Pic
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-2 w-full">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={profAvatarUrl}
                          onChange={(e) => setProfAvatarUrl(e.target.value)}
                          placeholder="https://..."
                          className="flex-1 px-3 py-1.5 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white"
                        />
                        <label className="px-3 py-1.5 rounded-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold cursor-pointer shrink-0 flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5" />
                          <span>내 컴퓨터 파일</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <p className="text-[10px] text-white/40">
                        웹 이미지 URL을 직접 입력하거나 컴퓨터의 사진 파일(PNG/JPG)을 선택하세요.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Artist Bio Lines (프로필 소개글 / 멘트) */}
              <div className="p-5 rounded-lg bg-[#1A1A1F] border border-white/10 space-y-3">
                <h4 className="font-serif text-sm text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>작가 소개글 및 인사말 (Bio Lines - 줄바꿈 구분)</span>
                </h4>
                <p className="text-[11px] text-white/50">
                  각 줄(Enter)마다 About 프로필 문단으로 나뉘어 표시됩니다. 작가의 소개, 중요 가치관, 주요 작업 경력을 자유롭게 적어주세요.
                </p>
                <textarea
                  rows={5}
                  value={profBioText}
                  onChange={(e) => setProfBioText(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white leading-relaxed resize-y placeholder-white/30"
                  placeholder={`안녕하세요! 캐릭터 디자인과 일러스트레이션을 전적으로 진행하는 치코(Chiko)입니다.\n트렌디한 색감과 몰입감 넘치는 매력적인 캐릭터성을 가장 중요하게 생각합니다.\n게임 키비주얼, 버튜버, 굿즈 등 다양한 매체의 일러스트 경험을 가지고 있습니다.`}
                />
              </div>

              {/* 3. Performance Stats */}
              <div className="p-5 rounded-lg bg-[#1A1A1F] border border-white/10 space-y-3">
                <h4 className="font-serif text-sm text-amber-300 flex items-center gap-2">
                  <span>경력 및 프로젝트 수치 (Stats)</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">
                      총 경력 (년)
                    </label>
                    <input
                      type="number"
                      value={profExpYears}
                      onChange={(e) => setProfExpYears(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">
                      완료 건수 (건)
                    </label>
                    <input
                      type="number"
                      value={profCompletedCommissions}
                      onChange={(e) => setProfCompletedCommissions(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">
                      재의뢰율 (%)
                    </label>
                    <input
                      type="number"
                      value={profRepeatRate}
                      onChange={(e) => setProfRepeatRate(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">
                      만족도 (%)
                    </label>
                    <input
                      type="number"
                      value={profSatisfactionRate}
                      onChange={(e) => setProfSatisfactionRate(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Skills & Commercial Scope */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Skills */}
                <div className="p-5 rounded-lg bg-[#1A1A1F] border border-white/10 space-y-2">
                  <h4 className="font-serif text-sm text-amber-300">사용 툴 및 기술 태그 (쉼표 구분)</h4>
                  <p className="text-[10px] text-white/40">예: Photoshop, Clip Studio Paint, Live2D, Illustrator</p>
                  <textarea
                    rows={3}
                    value={profSkillsText}
                    onChange={(e) => setProfSkillsText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white resize-y"
                  />
                </div>

                {/* Commercial Scope */}
                <div className="p-5 rounded-lg bg-[#1A1A1F] border border-white/10 space-y-2">
                  <h4 className="font-serif text-sm text-amber-300">상업 및 외주 작업 범위 (줄바꿈 구분)</h4>
                  <p className="text-[10px] text-white/40">예: 게임 키비주얼, 버튜버 파츠 분리, 굿즈 패키지</p>
                  <textarea
                    rows={3}
                    value={profScopesText}
                    onChange={(e) => setProfScopesText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white leading-relaxed resize-y"
                  />
                </div>

              </div>

              {/* 5. Contact & Social Links */}
              <div className="p-5 rounded-lg bg-[#1A1A1F] border border-white/10 space-y-3">
                <h4 className="font-serif text-sm text-amber-300">소셜 &amp; 문의 링크 정보 (Social &amp; Contact)</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">대표 이메일</label>
                    <input
                      type="text"
                      value={profEmail}
                      onChange={(e) => setProfEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white"
                      placeholder="chiko.illust@example.com"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">오픈카카오톡 링크</label>
                    <input
                      type="text"
                      value={profOpenKakao}
                      onChange={(e) => setProfOpenKakao(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white"
                      placeholder="https://open.kakao.com/..."
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">디스코드 ID</label>
                    <input
                      type="text"
                      value={profDiscord}
                      onChange={(e) => setProfDiscord(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white"
                      placeholder="Chiko_Illust#0001"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">X (트위터) URL</label>
                    <input
                      type="text"
                      value={profTwitter}
                      onChange={(e) => setProfTwitter(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white"
                      placeholder="https://x.com/..."
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">Pixiv URL</label>
                    <input
                      type="text"
                      value={profPixiv}
                      onChange={(e) => setProfPixiv(e.target.value)}
                      className="w-full px-3 py-2 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white"
                      placeholder="https://pixiv.net/..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-sm bg-amber-300 hover:bg-amber-200 text-black font-bold text-xs uppercase tracking-widest transition-colors shadow-lg flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>작가 프로필 변경사항 저장 (Save All Specs)</span>
                </button>
              </div>

            </form>
          )}

          {/* TAB 3: FAQ Manager */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <form onSubmit={handleCreateFAQ} className="p-4 rounded-lg bg-[#1A1A1F] border border-white/10 space-y-3">
                <h4 className="font-serif text-xs text-white">Add FAQ Entry</h4>
                <input
                  type="text"
                  required
                  placeholder="Question (e.g. Do you provide PSD source files?)"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white placeholder-white/30"
                />
                <textarea
                  rows={2}
                  required
                  placeholder="Answer..."
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-sm bg-[#0A0A0B] border border-white/10 text-xs text-white resize-none placeholder-white/30"
                />
                <button type="submit" className="px-4 py-2 rounded-sm bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors">
                  Add FAQ
                </button>
              </form>

              <div className="space-y-3">
                {faqs.map((f) => (
                  <div key={f.id} className="p-4 rounded-lg bg-[#1A1A1F] border border-white/10 flex justify-between gap-4">
                    <div>
                      <strong className="text-white text-xs block mb-1 font-serif">Q. {f.question}</strong>
                      <p className="text-white/60 text-xs font-light">A. {f.answer}</p>
                    </div>
                    <button
                      onClick={() => deleteFAQ(f.id)}
                      className="p-1.5 rounded-sm bg-rose-500/10 text-rose-300 border border-rose-500/30 shrink-0 self-start"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Inquiries Log */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              {inquiries.length === 0 ? (
                <div className="p-12 text-center text-white/40 text-xs font-light">
                  No submitted inquiries yet.
                </div>
              ) : (
                inquiries.map((inq) => (
                  <div key={inq.id} className="p-5 rounded-lg bg-[#1A1A1F] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-sm text-white">{inq.clientName}</span>
                        <span className="px-2 py-0.5 rounded-sm bg-white/10 text-white text-[9px] uppercase tracking-widest font-semibold">
                          {inq.usageType}
                        </span>
                      </div>
                      <span className="text-[10px] text-white/40">{inq.submittedAt}</span>
                    </div>

                    <div className="text-xs text-white/70 font-light space-y-1">
                      <p>Contact: <strong className="text-white font-normal">{inq.contactDetail}</strong> ({inq.contactMethod})</p>
                      <p>Service: {inq.serviceType} | Budget: {inq.budget} | Deadline: {inq.deadline}</p>
                      {inq.referenceWorkTitle && (
                        <p className="text-amber-200">Ref Artwork: {inq.referenceWorkTitle}</p>
                      )}
                      <p className="p-3 rounded-sm bg-[#0A0A0B] border border-white/10 text-white/70 mt-2 whitespace-pre-line font-light">
                        {inq.details}
                      </p>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => inq.id && deleteInquiry(inq.id)}
                        className="px-3 py-1 rounded-sm bg-rose-500/10 text-rose-300 border border-rose-500/30 text-[10px] uppercase font-bold tracking-wider"
                      >
                        Delete Log
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-[#0A0A0B] border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => {
              if (confirm('Reset to initial sample portfolio data?')) {
                resetToDefault();
                alert('Default data restored.');
              }
            }}
            className="px-3 py-1.5 rounded-sm bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-rose-900/40 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="px-5 py-2 rounded-sm bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors"
          >
            Close
          </button>
        </div>

      </div>

    </div>
  );
};
