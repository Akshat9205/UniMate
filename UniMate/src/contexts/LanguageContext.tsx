import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'english' | 'spanish' | 'french' | 'german' | 'chinese' | 'hindi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  english: {
    // Navigation
    home: 'Home',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    
    // Settings
    profileSettings: 'Profile Settings',
    notifications: 'Notifications',
    privacySecurity: 'Privacy & Security',
    appearance: 'Appearance',
    languageRegion: 'Language & Region',
    helpSupport: 'Help & Support',
    
    // Form fields
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email Address',
    phone: 'Phone Number',
    bio: 'Bio',
    language: 'Language',
    timezone: 'Timezone',
    
    // Bug report
    reportBug: 'Report a Bug',
    bugType: 'Bug Type',
    bugTitle: 'Bug Title',
    bugDescription: 'Bug Description',
    stepsToReproduce: 'Steps to Reproduce',
    severity: 'Severity Level',
    submitBugReport: 'Submit Bug Report',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    update: 'Update',
    delete: 'Delete',
    loading: 'Loading...',
    success: 'Success',
    error: 'Error',
    
    // Messages
    profileUpdated: 'Profile updated successfully',
    bugReportSubmitted: 'Bug report submitted successfully',
    fillRequiredFields: 'Please fill in all required fields'
  },
  spanish: {
    // Navigation
    home: 'Inicio',
    profile: 'Perfil',
    settings: 'Configuración',
    logout: 'Cerrar Sesión',
    
    // Settings
    profileSettings: 'Configuración del Perfil',
    notifications: 'Notificaciones',
    privacySecurity: 'Privacidad y Seguridad',
    appearance: 'Apariencia',
    languageRegion: 'Idioma y Región',
    helpSupport: 'Ayuda y Soporte',
    
    // Form fields
    firstName: 'Nombre',
    lastName: 'Apellido',
    email: 'Correo Electrónico',
    phone: 'Número de Teléfono',
    bio: 'Biografía',
    language: 'Idioma',
    timezone: 'Zona Horaria',
    
    // Bug report
    reportBug: 'Reportar Error',
    bugType: 'Tipo de Error',
    bugTitle: 'Título del Error',
    bugDescription: 'Descripción del Error',
    stepsToReproduce: 'Pasos para Reproducir',
    severity: 'Nivel de Gravedad',
    submitBugReport: 'Enviar Reporte de Error',
    
    // Common
    save: 'Guardar',
    cancel: 'Cancelar',
    update: 'Actualizar',
    delete: 'Eliminar',
    loading: 'Cargando...',
    success: 'Éxito',
    error: 'Error',
    
    // Messages
    profileUpdated: 'Perfil actualizado exitosamente',
    bugReportSubmitted: 'Reporte de error enviado exitosamente',
    fillRequiredFields: 'Por favor complete todos los campos requeridos'
  },
  french: {
    // Navigation
    home: 'Accueil',
    profile: 'Profil',
    settings: 'Paramètres',
    logout: 'Déconnexion',
    
    // Settings
    profileSettings: 'Paramètres du Profil',
    notifications: 'Notifications',
    privacySecurity: 'Confidentialité et Sécurité',
    appearance: 'Apparence',
    languageRegion: 'Langue et Région',
    helpSupport: 'Aide et Support',
    
    // Form fields
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Adresse Email',
    phone: 'Numéro de Téléphone',
    bio: 'Biographie',
    language: 'Langue',
    timezone: 'Fuseau Horaire',
    
    // Bug report
    reportBug: 'Signaler un Bug',
    bugType: 'Type de Bug',
    bugTitle: 'Titre du Bug',
    bugDescription: 'Description du Bug',
    stepsToReproduce: 'Étapes pour Reproduire',
    severity: 'Niveau de Gravité',
    submitBugReport: 'Soumettre le Rapport de Bug',
    
    // Common
    save: 'Enregistrer',
    cancel: 'Annuler',
    update: 'Mettre à jour',
    delete: 'Supprimer',
    loading: 'Chargement...',
    success: 'Succès',
    error: 'Erreur',
    
    // Messages
    profileUpdated: 'Profil mis à jour avec succès',
    bugReportSubmitted: 'Rapport de bug soumis avec succès',
    fillRequiredFields: 'Veuillez remplir tous les champs obligatoires'
  },
  german: {
    // Navigation
    home: 'Startseite',
    profile: 'Profil',
    settings: 'Einstellungen',
    logout: 'Abmelden',
    
    // Settings
    profileSettings: 'Profil-Einstellungen',
    notifications: 'Benachrichtigungen',
    privacySecurity: 'Datenschutz & Sicherheit',
    appearance: 'Erscheinungsbild',
    languageRegion: 'Sprache & Region',
    helpSupport: 'Hilfe & Support',
    
    // Form fields
    firstName: 'Vorname',
    lastName: 'Nachname',
    email: 'E-Mail-Adresse',
    phone: 'Telefonnummer',
    bio: 'Biografie',
    language: 'Sprache',
    timezone: 'Zeitzone',
    
    // Bug report
    reportBug: 'Fehler Melden',
    bugType: 'Fehlertyp',
    bugTitle: 'Fehlertitel',
    bugDescription: 'Fehlerbeschreibung',
    stepsToReproduce: 'Schritte zur Reproduktion',
    severity: 'Schweregrad',
    submitBugReport: 'Fehlerbericht Einreichen',
    
    // Common
    save: 'Speichern',
    cancel: 'Abbrechen',
    update: 'Aktualisieren',
    delete: 'Löschen',
    loading: 'Laden...',
    success: 'Erfolg',
    error: 'Fehler',
    
    // Messages
    profileUpdated: 'Profil erfolgreich aktualisiert',
    bugReportSubmitted: 'Fehlerbericht erfolgreich eingereicht',
    fillRequiredFields: 'Bitte füllen Sie alle Pflichtfelder aus'
  },
  chinese: {
    // Navigation
    home: '首页',
    profile: '个人资料',
    settings: '设置',
    logout: '登出',
    
    // Settings
    profileSettings: '个人资料设置',
    notifications: '通知',
    privacySecurity: '隐私与安全',
    appearance: '外观',
    languageRegion: '语言与地区',
    helpSupport: '帮助与支持',
    
    // Form fields
    firstName: '名字',
    lastName: '姓氏',
    email: '电子邮件地址',
    phone: '电话号码',
    bio: '个人简介',
    language: '语言',
    timezone: '时区',
    
    // Bug report
    reportBug: '报告错误',
    bugType: '错误类型',
    bugTitle: '错误标题',
    bugDescription: '错误描述',
    stepsToReproduce: '重现步骤',
    severity: '严重程度',
    submitBugReport: '提交错误报告',
    
    // Common
    save: '保存',
    cancel: '取消',
    update: '更新',
    delete: '删除',
    loading: '加载中...',
    success: '成功',
    error: '错误',
    
    // Messages
    profileUpdated: '个人资料更新成功',
    bugReportSubmitted: '错误报告提交成功',
    fillRequiredFields: '请填写所有必填字段'
  },
  hindi: {
    // Navigation
    home: 'होम',
    profile: 'प्रोफाइल',
    settings: 'सेटिंग्स',
    logout: 'लॉग आउट',
    
    // Settings
    profileSettings: 'प्रोफाइल सेटिंग्स',
    notifications: 'सूचनाएं',
    privacySecurity: 'गोपनीयता और सुरक्षा',
    appearance: 'दिखावट',
    languageRegion: 'भाषा और क्षेत्र',
    helpSupport: 'सहायता और समर्थन',
    
    // Form fields
    firstName: 'पहला नाम',
    lastName: 'अंतिम नाम',
    email: 'ईमेल पता',
    phone: 'फोन नंबर',
    bio: 'जीवनी',
    language: 'भाषा',
    timezone: 'समय क्षेत्र',
    
    // Bug report
    reportBug: 'बग रिपोर्ट करें',
    bugType: 'बग प्रकार',
    bugTitle: 'बग शीर्षक',
    bugDescription: 'बग विवरण',
    stepsToReproduce: 'पुनरुत्पादन के चरण',
    severity: 'गंभीरता स्तर',
    submitBugReport: 'बग रिपोर्ट सबमिट करें',
    
    // Common
    save: 'सेव करें',
    cancel: 'रद्द करें',
    update: 'अपडेट करें',
    delete: 'हटाएं',
    loading: 'लोड हो रहा है...',
    success: 'सफलता',
    error: 'त्रुटि',
    
    // Messages
    profileUpdated: 'प्रोफाइल सफलतापूर्वक अपडेट हो गई',
    bugReportSubmitted: 'बग रिपोर्ट सफलतापूर्वक सबमिट हो गई',
    fillRequiredFields: 'कृपया सभी आवश्यक फ़ील्ड भरें'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('english');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key as keyof typeof translations.english] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
