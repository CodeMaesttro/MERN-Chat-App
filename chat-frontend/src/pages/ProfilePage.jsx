import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
<<<<<<< HEAD
import { Camera } from 'lucide-react';
=======
import { Camera, Mail, User } from 'lucide-react';
>>>>>>> dd7b13d81f6ea6ea8c4aa32e2a165477d03a39b6
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
<<<<<<< HEAD

  const [selectedImg, setSelectedImg] = useState(null);

  const [formData, setFormData] = useState({
    username: authUser?.user?.username || '',
    email: authUser?.user?.email || '',
    country: authUser?.user?.location?.country || '',
    city: authUser?.user?.location?.city || '',
    address: authUser?.user?.location?.address || '',
    bio: authUser?.user?.bio || '',
    relationshipStatus: authUser?.user?.relationshipStatus || '',
    dateOfBirth: authUser?.user?.dateOfBirth?.slice(0, 10) || '',
  });


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return toast.error('Invalid image file');

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImg(reader.result);
      setFormData(prev => ({ ...prev, avatar: reader.result }));
=======
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      setSelectedImg(reader.result);
      try {
        await updateProfile({ profilePic: reader.result });
      } catch (error) {
        toast.error('Failed to upload image');
      }
>>>>>>> dd7b13d81f6ea6ea8c4aa32e2a165477d03a39b6
    };
    reader.readAsDataURL(file);
  };

<<<<<<< HEAD
  // Handle form field updates
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit updated profile data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
    } catch (err) {
    }
  };

  // --- Format createdAt into readable date ---
  const memberSince = new Date(authUser?.user?.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow space-y-8">
        
        {/* ---------- Page Header ---------- */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-gray-600">Update your profile details below</p>
        </div>

        {/* ---------- Avatar Upload ---------- */}
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={selectedImg || authUser?.user?.avatar || '/avatar.png'}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border shadow"
            />
            <label
              htmlFor="avatar"
              className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition"
            >
              <Camera className="text-white w-5 h-5" />
              <input
                type="file"
                id="avatar"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        {/* ---------- Account Info ---------- */}
        <div className="text-center text-sm text-gray-600 space-y-1">
          <p><span className="font-medium text-gray-800">Account Status:</span> Active</p>
          <p><span className="font-medium text-gray-800">Member Since:</span> {memberSince}</p>
        </div>

        {/* ---------- Profile Form ---------- */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Grid of input fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="input" required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input" required />
            <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="input" />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="input" />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="input" />
            <input type="text" name="relationshipStatus" placeholder="Relationship Status" value={formData.relationshipStatus} onChange={handleChange} className="input" />
            <input type="date" name="dateOfBirth" placeholder="Date of Birth" value={formData.dateOfBirth} onChange={handleChange} className="input" />
          </div>

          {/* Bio text area */}
          <textarea
            name="bio"
            placeholder="Enter your bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            className="input w-full"
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={isUpdatingProfile}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
=======
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="card p-8 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="mt-2 text-gray-600">Your profile information</p>
          </div>

          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profilePic || '/avatar.png'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 p-2 rounded-full cursor-pointer transition-all duration-200 hover:scale-105 ${
                  isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''
                }`}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">
              {isUpdatingProfile ? 'Uploading...' : 'Click the camera icon to update your photo'}
            </p>
          </div>

          {/* User Information */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <User className="w-4 h-4" />
                Username
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                {authUser?.username || 'N/A'}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                {authUser?.email || 'N/A'}
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium text-gray-900">
                  {authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Account Status</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
>>>>>>> dd7b13d81f6ea6ea8c4aa32e2a165477d03a39b6
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default ProfilePage;
=======
export default ProfilePage;
>>>>>>> dd7b13d81f6ea6ea8c4aa32e2a165477d03a39b6
