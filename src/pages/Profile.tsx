
import { useState } from 'react';

type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  passportNumber: string;
  nationality: string;
  birthDate: string;
};

const initialProfile: UserProfile = {
  id: 'usr12345',
  firstName: 'Jean',
  lastName: 'Dupont',
  email: 'jean.dupont@example.com',
  phone: '+33 6 12 34 56 78',
  address: '15 Rue de Paris, 75001 Paris, France',
  passportNumber: 'FR12345678',
  nationality: 'Française',
  birthDate: '1985-05-15',
};

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(initialProfile);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value,
    });
  };
  
  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Profil utilisateur</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-blue-600">Informations personnelles</h2>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Modifier
            </button>
          ) : (
            <div className="flex space-x-2">
              <button 
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Sauvegarder
              </button>
            </div>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
            {isEditing ? (
              <input 
                type="text" 
                name="firstName"
                value={editedProfile.firstName} 
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            ) : (
              <p className="text-gray-800">{profile.firstName}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            {isEditing ? (
              <input 
                type="text" 
                name="lastName"
                value={editedProfile.lastName} 
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            ) : (
              <p className="text-gray-800">{profile.lastName}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            {isEditing ? (
              <input 
                type="email" 
                name="email"
                value={editedProfile.email} 
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            ) : (
              <p className="text-gray-800">{profile.email}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            {isEditing ? (
              <input 
                type="text" 
                name="phone"
                value={editedProfile.phone} 
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            ) : (
              <p className="text-gray-800">{profile.phone}</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
            {isEditing ? (
              <input 
                type="text" 
                name="address"
                value={editedProfile.address} 
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            ) : (
              <p className="text-gray-800">{profile.address}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de passeport</label>
            {isEditing ? (
              <input 
                type="text" 
                name="passportNumber"
                value={editedProfile.passportNumber} 
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            ) : (
              <p className="text-gray-800">{profile.passportNumber}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nationalité</label>
            {isEditing ? (
              <input 
                type="text" 
                name="nationality"
                value={editedProfile.nationality} 
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            ) : (
              <p className="text-gray-800">{profile.nationality}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
            {isEditing ? (
              <input 
                type="date" 
                name="birthDate"
                value={editedProfile.birthDate} 
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            ) : (
              <p className="text-gray-800">{new Date(profile.birthDate).toLocaleDateString('fr-FR')}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Préférences de voyage</h2>
        
        <div className="space-y-4">
          <div>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
              <span className="ml-2 text-gray-700">Recevoir des notifications par email</span>
            </label>
          </div>
          
          <div>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
              <span className="ml-2 text-gray-700">Recevoir des notifications SMS</span>
            </label>
          </div>
          
          <div>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
              <span className="ml-2 text-gray-700">Sauvegarder mes préférences de siège</span>
            </label>
          </div>
          
          <div>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
              <span className="ml-2 text-gray-700">M'informer des offres spéciales</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
