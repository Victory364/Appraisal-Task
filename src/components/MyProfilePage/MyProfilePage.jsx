import { useState } from 'react';
import './MyProfilePage.css';

import EditBasicInfoModal from '../modals/EditBasicInfoModal/EditBasicInfoModal';
import EditAddressModal from '../modals/EditAddressModal/EditAddressModal';
import UploadImageModal from '../modals/UploadImageModal/UploadImageModal';
import ConfirmActionModal from '../modals/ConfirmActionModal/ConfirmActionModal';
import RequestSubmittedModal from '../modals/RequestSubmittedModal/RequestSubmittedModal';
import ChangePasswordModal from '../modals/ChangePasswordModal/ChangePasswordModal';
import StartTrainingModal from '../modals/StartTrainingModal/StartTrainingModal';
import OngoingTrainingModal from '../modals/OngoingTrainingModal/OngoingTrainingModal';

// Icon imports
import noStarIcon from '../../assets/Fowgate Folder/No star.svg';
import pdfIcon from '../../assets/Fowgate Folder/pdf-file-svgrepo-com 1.svg';
import downloadIcon from '../../assets/Fowgate Folder/download-04.svg';
import copyIcon from '../../assets/Fowgate Folder/file-search.svg';
import certificateIcon from '../../assets/Fowgate Folder/certificate-svgrepo-com 1.svg';
import excelIcon from '../../assets/Fowgate Folder/excel-svgrepo-com 1.svg';
import powerpointIcon from '../../assets/Fowgate Folder/powerpoint-svgrepo-com 1.svg';
import wordIcon from '../../assets/Fowgate Folder/ms-word-svgrepo-com 1.svg';
import searchIcon from '../../assets/Fowgate Folder/search-normal.svg';
import cameraIcon from '../../assets/Fowgate Folder/camera-02.svg';
import arrowRightIcon from '../../assets/Fowgate Folder/Frame (1).svg';
import starsIcon from '../../assets/Fowgate Folder/Frame-1 (1).svg';
import picIcon from '../../assets/Fowgate Folder/Frame-3.svg';
import clockIcon from '../../assets/Fowgate Folder/clock-03.svg';
import pencilBlue from '../../assets/Fowgate Folder/Edit-blue.svg'
import pencilRed from '../../assets/Fowgate Folder/Edit-red.svg'

export default function MyProfilePage() {
  // State for basic info
  const [basicInfo, setBasicInfo] = useState({
    fullName: 'Adewale Fayemi',
    countryCode: '+234',
    mobileNumber: '810-589-4695',
    email: 'adewalefayemi10@gmail.com',
    dob: '08-05-2002',
    gender: 'Male',
    ssn: '000-000',
    employeeId: '013',
    department: 'Design Team',
    employmentType: 'Contract',
    availability: 'On Leave',
    employmentStatus: 'Active',
    dateOfHiring: '30-06, 2023'
  });

  // State for address
  const [address, setAddress] = useState({
    country: 'United State',
    state: 'California',
    city: 'San Francisco',
    postalCode: '90210',
    address1: '',
    address2: ''
  });

  // State for profile photo
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Modal visibility states
  const [isEditInfoOpen, setIsEditInfoOpen] = useState(false);
  const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
  const [isUploadPhotoOpen, setIsUploadPhotoOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [confirmActionContext, setConfirmActionContext] = useState(null);
  const [isRequestSubmittedOpen, setIsRequestSubmittedOpen] = useState(false);
  const [submittedType, setSubmittedType] = useState(null);
  
  // Training states
  const [isStartTrainingOpen, setIsStartTrainingOpen] = useState(false);
  const [isOngoingTrainingOpen, setIsOngoingTrainingOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [trainings, setTrainings] = useState([]);

  // Pending states
  const [isAddressPending, setIsAddressPending] = useState(false);
  const [isBasicInfoPending, setIsBasicInfoPending] = useState(false);
  const [pendingInfoFields, setPendingInfoFields] = useState([]);

  // State for credentials table
  const [credentials] = useState([
    { id: 1, name: 'My Resume', type: 'PDF', date: '18 NOV, 2024', status: 'Approved' },
    { id: 2, name: 'Lorem Ipsum Presentation', type: 'Powerpoint', date: '18 NOV, 2024', status: 'Pending' },
    { id: 3, name: 'Fowgate Spreadsheet', type: 'Excel', date: '18 NOV, 2024', status: 'Pending' },
    { id: 4, name: 'Litzburg Project Brief', type: 'Doc', date: '18 NOV, 2024', status: 'Approved' },
  ]);

  const [searchCreds, setSearchCreds] = useState('');

  // Password interactive state
  const [passwordMask, setPasswordMask] = useState('**********');

  const handleChangePassword = () => {
    setIsChangePasswordOpen(true);
  };

  const handleChangePasswordSubmit = (data) => {
    setIsChangePasswordOpen(false);
    setConfirmActionContext({ type: 'password', data });
  };

  // Resignation toggle or action
  const handleResignation = () => {
    if (window.confirm("Are you sure you want to submit a resignation request?")) {
      setBasicInfo(prev => ({
        ...prev,
        employmentStatus: 'Resigned',
        availability: 'Unavailable'
      }));
    }
  };

  const handleEditInfoSubmit = (data) => {
    setIsEditInfoOpen(false);
    setConfirmActionContext({ type: 'info', data });
  };

  const handleEditAddressSubmit = (data) => {
    setIsEditAddressOpen(false);
    setConfirmActionContext({ type: 'address', data });
  };

  const handleStartTrainingSubmit = (data) => {
    setIsStartTrainingOpen(false);
    setConfirmActionContext({ type: 'startTraining', data });
  };

  const handleOngoingTrainingSubmit = () => {
    setIsOngoingTrainingOpen(false);
    setConfirmActionContext({ type: 'completeTraining', data: selectedTraining });
  };

  const handleConfirmAction = () => {
    if (confirmActionContext?.type === 'info') {
      const data = confirmActionContext.data;
      const newSsn = data.ssnType || data.ssn;
      
      const updatedFields = [];
      if (data.fullName !== basicInfo.fullName) updatedFields.push('fullName');
      if (data.dob !== basicInfo.dob) updatedFields.push('dob');
      if (data.gender !== basicInfo.gender) updatedFields.push('gender');
      if (newSsn !== basicInfo.ssn) updatedFields.push('ssn');
      if (data.email !== basicInfo.email) updatedFields.push('email');
      if (data.mobileNumber !== basicInfo.mobileNumber || data.countryCode !== basicInfo.countryCode) updatedFields.push('mobileNumber');

      setBasicInfo(prev => ({
        ...prev,
        fullName: data.fullName,
        countryCode: data.countryCode,
        mobileNumber: data.mobileNumber,
        email: data.email,
        dob: data.dob,
        gender: data.gender,
        ssn: newSsn
      }));
      
      if (updatedFields.length > 0) {
        setPendingInfoFields(prev => [...new Set([...prev, ...updatedFields])]);
        setIsBasicInfoPending(true);
      }
    } else if (confirmActionContext?.type === 'address') {
      const data = confirmActionContext.data;
      setAddress(prev => ({
        ...prev,
        country: data.country,
        state: data.state,
        city: data.city,
        postalCode: data.postalCode,
        address1: data.address1,
        address2: data.address2
      }));
      setIsAddressPending(true);
    } else if (confirmActionContext?.type === 'password') {
      const data = confirmActionContext.data;
      setPasswordMask('*'.repeat(data.newPassword.length));
    } else if (confirmActionContext?.type === 'startTraining') {
      const data = confirmActionContext.data;
      setTrainings(prev => [...prev, data]);
    } else if (confirmActionContext?.type === 'completeTraining') {
      const data = confirmActionContext.data;
      setTrainings(prev => prev.map(t => t === data ? { ...t, completed: true } : t));
    }
    
    setSubmittedType(confirmActionContext?.type);
    setConfirmActionContext(null);
    setIsRequestSubmittedOpen(true);
  };

  const handleCancelConfirm = () => {
    // Reopen the originating modal so the user can go back and edit
    if (confirmActionContext?.type === 'info') setIsEditInfoOpen(true);
    else if (confirmActionContext?.type === 'address') setIsEditAddressOpen(true);
    else if (confirmActionContext?.type === 'password') setIsChangePasswordOpen(true);
    else if (confirmActionContext?.type === 'startTraining') setIsStartTrainingOpen(true);
    else if (confirmActionContext?.type === 'completeTraining') setIsOngoingTrainingOpen(true);
    setConfirmActionContext(null);
  };

  const handlePhotoUpload = (photoUrl) => {
    setProfilePhoto(photoUrl);
    setIsUploadPhotoOpen(false);
  };

  // Helper to calculate hire duration (Mock logic based on screenshot)
  const getHireDuration = () => {
    return "1 yr, 4 months, 19 days";
  };

  return (
    <div className="my-profile-page">
      <div className="profile-layout-container">

        {/* Left Column - Profile Summary Card */}
        <div className="profile-sidebar-card">
          <div className="profile-avatar-container">
            <div className="profile-user-info-row">
              <div className="profile-avatar-clickable" onClick={() => setIsUploadPhotoOpen(true)}>
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="profile-avatar-img" />
                ) : (
                  <div className="profile-avatar-initials">
                    AF
                  </div>
                )}
                {/* Home/Building Overlay icon */}
                <div className="profile-avatar-overlay">
                  <img src={cameraIcon} alt="camera icon"  />
                </div>
              </div>

              <div className="profile-name-role">
                <h2 className="profile-display-name">{basicInfo.fullName}</h2>
                <p className="profile-display-role">Ui/Ux Designer</p>
              </div>
            </div>

            <div className="profile-action-buttons">
              {isBasicInfoPending ? (
                <button className="profile-btn-pending" disabled style={{ opacity: 1, cursor: 'default' }}>
                  <img src={clockIcon} alt="" />
                  Pending
                </button>
              ) : (
                <button className="profile-btn-edit" onClick={() => setIsEditInfoOpen(true)}>
                  <img src={pencilBlue} alt='Pencil blue'/>
                  Edit info
                </button>
              )}
              <button className="profile-btn-resignation" onClick={handleResignation}>
                <img src={pencilRed} alt='Pencil red'/>
                Resignation
              </button>
            </div>
          </div>

          <div className="profile-details-divider"></div>

          <div className="profile-details-list">
            <div className="profile-detail-item">
              <span className="detail-label">Fullname</span>
              <span className="detail-value">
                {basicInfo.fullName}
                {pendingInfoFields.includes('fullName') && <span className="pending-approval-badge badge-small">Pending approval</span>}
              </span>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label">Mobile number</span>
              <span className="detail-value">
                {basicInfo.countryCode}-{basicInfo.mobileNumber}
                {pendingInfoFields.includes('mobileNumber') && <span className="pending-approval-badge badge-small">Pending approval</span>}
              </span>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label">Email address</span>
              <span className="detail-value email-value">
                {basicInfo.email}
                {pendingInfoFields.includes('email') && <span className="pending-approval-badge badge-small">Pending approval</span>}
              </span>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label">Date of Birth</span>
              <span className="detail-value">
                {basicInfo.dob}
                {pendingInfoFields.includes('dob') && <span className="pending-approval-badge badge-small">Pending approval</span>}
              </span>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label">Gender</span>
              <span className="detail-value">
                {basicInfo.gender}
                {pendingInfoFields.includes('gender') && <span className="pending-approval-badge badge-small">Pending approval</span>}
              </span>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label">SSN</span>
              <span className="detail-value">
                {basicInfo.ssn}
                {pendingInfoFields.includes('ssn') && <span className="pending-approval-badge badge-small">Pending approval</span>}
              </span>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label">Employee ID</span>
              <span className="detail-value">{basicInfo.employeeId}</span>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label">Department</span>
              <span className="detail-value">{basicInfo.department}</span>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label">Employment Type</span>
              <span className="detail-value">{basicInfo.employmentType}</span>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label">Availability</span>
              <span className="detail-value">{basicInfo.availability}</span>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label">Employment Status</span>
              <span className="detail-value">
                <span className={`status-pill ${basicInfo.employmentStatus.toLowerCase()}`}>
                  {basicInfo.employmentStatus}
                </span>
              </span>
            </div>
            <div className="profile-detail-item hiring-item">
              <span className="detail-label">Date of Hiring</span>
              <div className="hiring-value-container">
                <span className="detail-value">{basicInfo.dateOfHiring}</span>
                <span className="hire-duration-badge">{getHireDuration()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Cards Grid */}
        <div className="profile-main-content">
          <div className="profile-cards-grid">

            {/* Card 1: My Address */}
            <div className="profile-card address-card">
              <div className="profile-card-header">
                <h3 className="card-title">My Address</h3>
                {isAddressPending ? (
                  <span className="pending-approval-badge">Pending approval</span>
                ) : (
                  <button className="card-header-link" onClick={() => setIsEditAddressOpen(true)}>Edit address</button>
                )}
              </div>
              <div className="profile-card-body address-grid">
                <div className="info-cell">
                  <span className="cell-label">Country</span>
                  <span className="cell-value">{address.country}</span>
                </div>
                <div className="info-cell">
                  <span className="cell-label">State/Province</span>
                  <span className="cell-value">{address.state}</span>
                </div>
                <div className="info-cell">
                  <span className="cell-label">City</span>
                  <span className="cell-value">{address.city}</span>
                </div>
                <div className="info-cell">
                  <span className="cell-label">Postal Code</span>
                  <span className="cell-value">{address.postalCode}</span>
                </div>
              </div>
            </div>

            {/* Card 2: Onboarding Task */}
            <div className="profile-card onboarding-card">
              <div className="profile-card-header">
                <h3 className="card-title">Onboarding Task</h3>
                <span href="#onboarding" className="card-header-link">
                  View Progress
                  <span className="right-arrow-icon" aria-hidden="true">
                    <img src={arrowRightIcon} alt="arrow right" /></span>
                </span>
              </div>
              <div className="profile-card-body onboarding-grid">
                <div className="onboarding-metrics">
                  <div className="info-cell">
                    <span className="cell-label">Total Tasks</span>
                    <span className="cell-value">12</span>
                  </div>
                  <div className="info-cell">
                    <span className="cell-label">Completed</span>
                    <span className="cell-value">0</span>
                  </div>
                  <div className="info-cell">
                    <span className="cell-label">Pending</span>
                    <span className="cell-value">0</span>
                  </div>
                </div>
                <div className="onboarding-progress-container">
                  <span className="progress-label">Onboarding Status</span>
                  <div className="progress-bar-wrapper">
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill" style={{ width: '0%' }}></div>
                    </div>
                    <span className="progress-percentage">0%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: My Performance Rating */}
            <div className="profile-card performance-card">
              <div className="profile-card-header">
                <h3 className="card-title">My Performance Rating</h3>
              </div>
              <div className="profile-card-body rating-body">
                <div className="stars-row">
                  <img src={noStarIcon} alt="star" />
                  <img src={noStarIcon} alt="star" />
                  <img src={noStarIcon} alt="star" />
                  <img src={noStarIcon} alt="star" />
                  <img src={noStarIcon} alt="star" />
                </div>
                <span className="rating-score">0.0</span>
              </div>
            </div>

            {/* Card 4: My Employee Handbook */}
            <div className="profile-card handbook-card">
              <div className="profile-card-header">
                <h3 className="card-title">My Employee Handbook</h3>
              </div>
              <div className="profile-card-body handbook-body">
                <div className="pdf-info">
                  <img src={pdfIcon} alt="PDF" className="pdf-doc-icon" />
                  <span className="pdf-name">Fowgate Employee Handbook</span>
                </div>
                <div className="handbook-actions">
                  <button className="handbook-action-btn" title="Download">
                    <img src={downloadIcon} alt="Download" />
                  </button>
                  <button className="handbook-action-btn" title="Copy link">
                    <img src={copyIcon} alt="Copy" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 5: Skill Growth */}
            <div className="profile-card skill-card">
              <div className="profile-card-header">
                <h3 className="card-title">Skill Growth</h3>
                <a href="#training" className="card-header-link" onClick={(e) => { e.preventDefault(); setIsStartTrainingOpen(true); }}>
                  Start a training
                  <img src={arrowRightIcon} alt="arrow right" className="link-arrow-icon" />
                </a>
              </div>
              <div className={`profile-card-body ${trainings.length === 0 ? 'empty-state' : ''}`}>
                {trainings.length === 0 ? (
                  <>
                    <div className="empty-badge">
                      <img src={certificateIcon} alt="Medal" className="empty-badge-icon" />
                    </div>
                    <p className="empty-main-text">Nothing here yet.</p>
                    <p className="empty-sub-text">Add a skill to get started</p>
                  </>
                ) : (
                  <div className="skills-list">
                    {trainings.map((training, index) => (
                      <div 
                        key={index} 
                        className={`skill-tag ${training.completed ? 'completed' : ''}`} 
                        onClick={() => {
                          if (!training.completed) {
                            setSelectedTraining(training);
                            setIsOngoingTrainingOpen(true);
                          }
                        }}
                        style={{ cursor: training.completed ? 'default' : 'pointer' }}
                      >
                        <span className="skill-tag-icon">
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.86667 1.33301C7.73333 1.33301 7.6 1.39967 7.53333 1.46634L6.6 2.33301L5.53333 2.13301C5.2 2.06634 5 2.26634 4.93333 2.53301L4.73333 3.73301L3.6 4.26634C3.33333 4.39967 3.26667 4.66634 3.4 4.93301L3.93333 5.99967L3.4 7.06634C3.26667 7.33301 3.4 7.59967 3.6 7.73301L4.73333 8.26634L4.93333 9.46634C5 9.73301 5.26667 9.93301 5.53333 9.86634L6.8 9.66634L7.73333 10.533C7.93333 10.733 8.26667 10.733 8.46667 10.533L9.4 9.66634L10.6667 9.86634C10.9333 9.93301 11.2 9.73301 11.2667 9.46634L11.4667 8.26634L12.6 7.73301C12.8667 7.59967 12.9333 7.33301 12.8 7.06634L12.0667 5.99967L12.6 4.93301C12.7333 4.66634 12.6667 4.39967 12.4 4.26634L11.2667 3.73301L11.0667 2.53301C11 2.26634 10.7333 2.06634 10.4667 2.13301L9.2 2.33301L8.26667 1.46634C8.2 1.33301 8 1.33301 7.86667 1.33301ZM4.06667 8.73301L2 12.8663L4.4 12.533L5.6 14.6663L7.33333 11.133L7.2 10.9997L6.53333 10.3997L5.6 10.533C5 10.5997 4.4 10.1997 4.26667 9.59967L4.06667 8.73301ZM11.9333 8.73301L11.7333 9.59967C11.6 10.133 11.1333 10.533 10.6 10.533H10.4667L9.53333 10.3997L8.86667 10.9997L8.73333 11.133L10.4667 14.6663L11.6667 12.5997L14.0667 12.933L11.9333 8.73301Z" />
                          </svg>
                        </span>
                        {training.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Card 6: Recommended Certifications */}
            <div className="profile-card certifications-card">
              <div className="profile-card-header">
                <div className="title-with-badge">
                  <h3 className="card-title">Recommended Certs</h3>
                  <span className="ai-badge">
                    <span className="ai-badge-stars">
                      <img src={starsIcon} alt="stars" />
                      </span> AI Assisted
                  </span>
                </div>
              </div>
              <div className="profile-card-body certs-body">
                <div className="cert-item">
                  <div className="cert-icon-wrapper">
                    <img src={certificateIcon} alt="Cert" className="cert-icon" />
                  </div>
                  <div className="cert-info">
                    <span className="cert-name">Adobe Certified Professional</span>
                    <span className="cert-duration">3hrs, 45mins</span>
                  </div>
                  <a href="#enroll-adobe" className="cert-enroll-link">Enroll</a>
                </div>
                <div className="cert-item">
                  <div className="cert-icon-wrapper">
                    <img src={certificateIcon} alt="Cert" className="cert-icon" />
                  </div>
                  <div className="cert-info">
                    <span className="cert-name">Human-Computer Interaction</span>
                    <span className="cert-duration">2 weeks</span>
                  </div>
                  <a href="#enroll-hci" className="cert-enroll-link">Enroll</a>
                </div>

                <a href="#more-certs" className="see-more-link">
                  See more certification
                  <svg className="chevron-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Card 7: Growth story */}
            <div className="profile-card growth-story-card">
              <div className="profile-card-header">
                <h3 className="card-title">Growth story</h3>
              </div>
              <div className="profile-card-body empty-card-body">
                <div className="empty-card-icon" aria-hidden="true">
                  <img src={picIcon} alt="growth story" />
                </div>
                <p>No growth stories yet. Take your first step - your journey matters.</p>
              </div>
            </div>

            {/* Card 8: Achievement */}
            <div className="profile-card achievement-card">
              <div className="profile-card-header">
                <h3 className="card-title">Achievement</h3>
              </div>
              <div className="profile-card-body empty-card-body">
                <div className="empty-card-icon" aria-hidden="true">
                  <img src={certificateIcon} alt="achievement" />
                </div>
                <p>Nothing here... yet! Keep progressing to earn your first achievement.</p>
              </div>
            </div>

          </div>

          {/* Card 9: My Credentials */}
          <div className="profile-card credentials-card-full">
            <div className="profile-card-header">
              <h3 className="card-title">My Credentials</h3>
              <div className="credentials-search-box">
                <input
                  type="text"
                  placeholder="Search here"
                  value={searchCreds}
                  onChange={(e) => setSearchCreds(e.target.value)}
                  className="credentials-search-input"
                />
                <img src={searchIcon} alt="Search" className="credentials-search-icon" />
              </div>
            </div>
            <div className="profile-card-body" style={{ overflowX: 'auto' }}>
              <table className="credentials-table">
                <thead>
                  <tr>
                    <th>Document Name</th>
                    <th>Document Type</th>
                    <th>Date Submitted</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {credentials
                    .filter(c => c.name.toLowerCase().includes(searchCreds.toLowerCase()))
                    .map((cred) => {
                      // Resolve type icon
                      let typeIcon = pdfIcon;
                      if (cred.type === 'Excel') typeIcon = excelIcon;
                      else if (cred.type === 'Powerpoint') typeIcon = powerpointIcon;
                      else if (cred.type === 'Doc') typeIcon = wordIcon;

                      return (
                        <tr key={cred.id}>
                          <td>{cred.name}</td>
                          <td>
                            <div className="doc-type-cell">
                              <img src={typeIcon} alt={cred.type} className="doc-type-icon" />
                              <span>{cred.type}</span>
                            </div>
                          </td>
                          <td>{cred.date}</td>
                          <td>
                            <span className={`status-pill ${cred.status.toLowerCase()}`}>
                              {cred.status}
                            </span>
                          </td>
                          <td>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#94a3b8" style={{ cursor: 'pointer' }}>
                              <circle cx="12" cy="6" r="2" />
                              <circle cx="12" cy="12" r="2" />
                              <circle cx="12" cy="18" r="2" />
                            </svg>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 10: Password */}
          <div className="profile-card password-card-full">
            <div className="password-card-content">
              <h3 className="card-title">Password</h3>
              <span className="password-mask">{passwordMask}</span>
              <button className="btn-change-password" onClick={handleChangePassword}>Change Password</button>
            </div>
          </div>

        </div>

      </div>

      {/* Modals Rendering */}
      {isEditInfoOpen && (
        <EditBasicInfoModal
          onClose={() => setIsEditInfoOpen(false)}
          onSubmit={handleEditInfoSubmit}
          initialData={basicInfo}
        />
      )}

      {isEditAddressOpen && (
        <EditAddressModal
          onClose={() => setIsEditAddressOpen(false)}
          onSubmit={handleEditAddressSubmit}
          initialData={address}
        />
      )}

      {isUploadPhotoOpen && (
        <UploadImageModal
          onClose={() => setIsUploadPhotoOpen(false)}
          onUpload={handlePhotoUpload}
        />
      )}

      {isChangePasswordOpen && (
        <ChangePasswordModal
          onClose={() => setIsChangePasswordOpen(false)}
          onSubmit={handleChangePasswordSubmit}
        />
      )}

      {isStartTrainingOpen && (
        <StartTrainingModal
          onClose={() => setIsStartTrainingOpen(false)}
          onSubmit={handleStartTrainingSubmit}
        />
      )}

      {isOngoingTrainingOpen && (
        <OngoingTrainingModal
          onClose={() => setIsOngoingTrainingOpen(false)}
          onSubmit={handleOngoingTrainingSubmit}
          trainingData={selectedTraining}
        />
      )}

      {confirmActionContext && (
        <ConfirmActionModal
          onClose={handleCancelConfirm}
          onConfirm={handleConfirmAction}
          message={
            confirmActionContext.type === 'password'
              ? "Are you sure you want to change your password? You'll need to use your new password the next time you sign in."
              : confirmActionContext.type === 'startTraining'
              ? "Are you sure you want to proceed with starting this training? Your training session will begin immediately."
              : confirmActionContext.type === 'completeTraining'
              ? "Are you sure you want to proceed with completion of this training? Ensure all necessary document are uploaded and confirmed."
              : undefined
          }
        />
      )}

      {isRequestSubmittedOpen && (
        <RequestSubmittedModal
          onClose={() => setIsRequestSubmittedOpen(false)}
          title={
            submittedType === 'password' ? 'Password Updated' :
            submittedType === 'startTraining' ? 'Training Started!' :
            submittedType === 'completeTraining' ? 'Training Complete!' : undefined
          }
          message={
            submittedType === 'password' ? 'Your new password is now active. Be sure to use it the next time you log in.' :
            submittedType === 'startTraining' ? 'Your training is ready. You can now access and begin the training.' :
            submittedType === 'completeTraining' ? 'Training completed successfully! Reach out if you have questions.' : undefined
          }
        />
      )}
    </div>
  );
}
