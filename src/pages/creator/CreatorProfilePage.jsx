import { useState, useEffect } from 'react';
import {
  User,
  Camera,
  Instagram,
  Youtube,
  Music2,
  Save,
  ExternalLink,
} from 'lucide-react';
import {
  Card,
  CardTitle,
  CardContent,
  Button,
  Input,
} from '../../components/common';
import { useAuth } from '../../contexts/AuthContext';
import { SKIN_TYPES, PRODUCT_CATEGORIES } from '../../constants';

export const CreatorProfilePage = () => {
  const { user, userProfile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    profileImage: null,
    skinTypes: [],
    categories: [],
    instagram: '',
    youtube: '',
    tiktok: '',
    bio: '',
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || '',
        phone: userProfile.phone || '',
        profileImage: userProfile.profile_image || null,
        skinTypes: userProfile.skin_types || [],
        categories: userProfile.categories || [],
        instagram: userProfile.instagram || '',
        youtube: userProfile.youtube || '',
        tiktok: userProfile.tiktok || '',
        bio: userProfile.bio || '',
      });
    }
  }, [userProfile]);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Update profile in Supabase
      console.log('Saving profile:', formData);
      alert('프로필이 저장되었습니다.');
      refreshProfile?.();
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('프로필 저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // TODO: Upload to Supabase Storage
      const reader = new FileReader();
      reader.onloadend = () => {
        updateFormData('profileImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">프로필 설정</h1>
        <p className="text-gray-500 mt-1">크리에이터 프로필을 설정하세요</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image */}
        <Card>
          <CardTitle>프로필 이미지</CardTitle>
          <CardContent className="mt-4">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {formData.profileImage ? (
                    <img
                      src={formData.profileImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50">
                  <Camera className="h-4 w-4 text-gray-600" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  프로필 이미지를 업로드하세요
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  권장 크기: 200x200px, JPG 또는 PNG
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card>
          <CardTitle>기본 정보</CardTitle>
          <CardContent className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="이름"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                placeholder="이름을 입력하세요"
                required
              />
              <Input
                label="연락처"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="010-0000-0000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Skin Type */}
        <Card>
          <CardTitle>피부 타입</CardTitle>
          <CardContent className="mt-4">
            <p className="text-sm text-gray-500 mb-4">
              해당하는 피부 타입을 모두 선택하세요 (다중 선택 가능)
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(SKIN_TYPES).map(([key, value]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleArrayField('skinTypes', key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    formData.skinTypes.includes(key)
                      ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                      : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardTitle>자신있는 카테고리</CardTitle>
          <CardContent className="mt-4">
            <p className="text-sm text-gray-500 mb-4">
              자신있는 뷰티 카테고리를 선택하세요
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(PRODUCT_CATEGORIES).map(([key, value]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleArrayField('categories', key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    formData.categories.includes(key)
                      ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                      : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SNS */}
        <Card>
          <CardTitle>SNS 계정</CardTitle>
          <CardContent className="mt-4 space-y-4">
            <div className="relative">
              <Input
                label="인스타그램"
                value={formData.instagram}
                onChange={(e) => updateFormData('instagram', e.target.value)}
                placeholder="https://instagram.com/username"
                icon={Instagram}
              />
              {formData.instagram && (
                <a
                  href={formData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>

            <div className="relative">
              <Input
                label="유튜브"
                value={formData.youtube}
                onChange={(e) => updateFormData('youtube', e.target.value)}
                placeholder="https://youtube.com/@username"
                icon={Youtube}
              />
              {formData.youtube && (
                <a
                  href={formData.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>

            <div className="relative">
              <Input
                label="틱톡"
                value={formData.tiktok}
                onChange={(e) => updateFormData('tiktok', e.target.value)}
                placeholder="https://tiktok.com/@username"
                icon={Music2}
              />
              {formData.tiktok && (
                <a
                  href={formData.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bio */}
        <Card>
          <CardTitle>자기소개</CardTitle>
          <CardContent className="mt-4">
            <textarea
              value={formData.bio}
              onChange={(e) => updateFormData('bio', e.target.value)}
              placeholder="간단한 자기소개를 작성해주세요"
              rows={4}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" icon={Save} loading={loading}>
            프로필 저장
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatorProfilePage;
