
import { useState } from 'react';

type UserProfile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  language: string;
  notifications: boolean;
};

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "+33 6 12 34 56 78",
    address: "123 rue de la République, 75001 Paris",
    language: "fr",
    notifications: true
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the updated profile to the backend
    setProfile(formData);
    setIsEditing(false);
    setSuccessMessage("Profil mis à jour avec succès!");
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }
    
    // In a real app, this would send the new password to the backend
    console.log("Password changed successfully");
    
    // Reset form and show success message
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setPasswordError("");
    setSuccessMessage("Mot de passe mis à jour avec succès!");
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Mon Profil</h1>
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6" role="alert">
          <p>{successMessage}</p>
        </div>
      )}
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-blue-600">Informations personnelles</h2>
              
              {!isEditing && (
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                  onClick={() => setIsEditing(true)}
                >
                  Modifier
                </button>
              )}
            </div>
            
            {isEditing ? (
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name} 
                    onChange={handleInputChange} 
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email} 
                    onChange={handleInputChange} 
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                  <input 
                    type="text" 
                    id="address" 
                    name="address"
                    value={formData.address} 
                    onChange={handleInputChange} 
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Langue préférée</label>
                  <select 
                    id="language" 
                    name="language"
                    value={formData.language} 
                    onChange={handleInputChange} 
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="fr">Français</option>
                    <option value="en">Anglais</option>
                    <option value="es">Espagnol</option>
                    <option value="de">Allemand</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="notifications" 
                    name="notifications"
                    checked={formData.notifications} 
                    onChange={handleInputChange} 
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700">Recevoir des notifications par email</label>
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                  >
                    Enregistrer
                  </button>
                  
                  <button 
                    type="button" 
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-colors"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(profile);
                    }}
                  >
                    Annuler
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Nom</h3>
                    <p className="mt-1">{profile.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1">{profile.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Téléphone</h3>
                    <p className="mt-1">{profile.phone}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Adresse</h3>
                    <p className="mt-1">{profile.address}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Langue préférée</h3>
                    <p className="mt-1">
                      {profile.language === 'fr' && 'Français'}
                      {profile.language === 'en' && 'Anglais'}
                      {profile.language === 'es' && 'Espagnol'}
                      {profile.language === 'de' && 'Allemand'}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Notifications</h3>
                    <p className="mt-1">{profile.notifications ? 'Activées' : 'Désactivées'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-blue-600 mb-6">Changer de mot de passe</h2>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
                <input 
                  type="password" 
                  id="currentPassword" 
                  name="currentPassword"
                  value={passwordData.currentPassword} 
                  onChange={handlePasswordChange} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                <input 
                  type="password" 
                  id="newPassword" 
                  name="newPassword"
                  value={passwordData.newPassword} 
                  onChange={handlePasswordChange} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword"
                  value={passwordData.confirmPassword} 
                  onChange={handlePasswordChange} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              
              {passwordError && (
                <div className="text-red-600 text-sm">{passwordError}</div>
              )}
              
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors mt-2"
              >
                Modifier le mot de passe
              </button>
            </form>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-blue-600 mb-4">Activité récente</h2>
            
            <ul className="space-y-4">
              <li className="border-b border-gray-200 pb-3">
                <h3 className="font-medium">Réservation #12456</h3>
                <p className="text-sm text-gray-600">Paris → New York</p>
                <p className="text-xs text-gray-500 mt-1">Il y a 2 jours</p>
              </li>
              
              <li className="border-b border-gray-200 pb-3">
                <h3 className="font-medium">Modification de profil</h3>
                <p className="text-sm text-gray-600">Email mis à jour</p>
                <p className="text-xs text-gray-500 mt-1">Il y a 1 semaine</p>
              </li>
              
              <li className="border-b border-gray-200 pb-3">
                <h3 className="font-medium">Annulation de réservation</h3>
                <p className="text-sm text-gray-600">London → Tokyo</p>
                <p className="text-xs text-gray-500 mt-1">Il y a 2 semaines</p>
              </li>
              
              <li>
                <h3 className="font-medium">Réservation #12345</h3>
                <p className="text-sm text-gray-600">Madrid → Buenos Aires</p>
                <p className="text-xs text-gray-500 mt-1">Il y a 1 mois</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
