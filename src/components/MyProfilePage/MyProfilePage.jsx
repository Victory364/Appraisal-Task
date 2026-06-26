import { useState } from 'react';
import './MyProfilePage.css';

// Modal imports
import EditBasicInfoModal from '../modals/EditBasicInfoModal/EditBasicInfoModal';
import EditAddressModal from '../modals/EditAddressModal/EditAddressModal';
import UploadImageModal from '../modals/UploadImageModal/UploadImageModal';

// Icon imports
import editIcon from '../../assets/Fowgate Folder/edit-user-02.svg';
import arrowIcon from '../../assets/Fowgate Folder/arrow-up-right-03.svg';
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
import arrowRightIcon from '../../assets/Fowgate Folder/frame (1).svg';
import starsIcon from '../../assets/Fowgate Folder/frame-1 (1).svg';
import picIcon from '../../assets/Fowgate Folder/frame-3.svg';

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
    dateOfHiring: '30-04-2023'
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
    const newPass = window.prompt("Enter new password (optional, press OK to submit):");
    if (newPass !== null) {
      if (newPass.length > 0) {
        setPasswordMask('*'.repeat(newPass.length));
        alert("Password change request submitted successfully!");
      } else {
        alert("Password change request submitted successfully!");
      }
    }
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
    // Map fields from modal to page state
    setBasicInfo(prev => ({
      ...prev,
      fullName: data.fullName,
      countryCode: data.countryCode,
      mobileNumber: data.mobileNumber,
      email: data.email,
      dob: data.dob,
      gender: data.gender,
      ssn: data.ssnType // or similar field mapping
    }));
    setIsEditInfoOpen(false);
  };

  const handleEditAddressSubmit = (data) => {
    setAddress(prev => ({
      ...prev,
      country: data.country,
      state: data.state,
      city: data.city,
      postalCode: data.postalCode,
      address1: data.address1,
      address2: data.address2
    }));
    setIsEditAddressOpen(false);
  };

  const handlePhotoUpload = (photoUrl) => {
    setProfilePhoto(photoUrl);
    setIsUploadPhotoOpen(false);
  };

  // Helper to calculate hire duration (Mock logic based on screenshot)
  const getHireDuration = () => {
    return "1 yr 4 months 10 days";
  };

  return (
    <div className="my-profile-page">
      <div className="profile-layout-container">

        {/* Left Column - Profile Summary Card */}
        <div className="profile-sidebar-card">
          <div className="profile-avatar-container">
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

            <h2 className="profile-display-name">{basicInfo.fullName}</h2>
            <p className="profile-display-role">Ui/Ux Designer</p>

            <div className="profile-action-buttons">
              <button className="profile-btn-edit" onClick={() => setIsEditInfoOpen(true)}>
                <img src={editIcon} alt="Edit" className="btn-icon-blue" />
                Edit info
              </button>
              <button className="profile-btn-resignation" onClick={handleResignation}>
                <svg className="btn-icon-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z" />
                </svg>
                Resignation
              </button>
            </div>
          </div>

          <div className="profile-details-divider"></div>

          <div className="profile-details-list">
            <div className="profile-detail-item">
              <span className="detail-label">Fullname</span>
              <span className="detail-value">{basicInfo.fullName}</span>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label">Mobile number</span>
              <span className="detail-value">{basicInfo.countryCode}-{basicInfo.mobileNumber}</span>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label">Email address</span>
              <span className="detail-value email-value">{basicInfo.email}</span>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label">Date of Birth</span>
              <span className="detail-value">{basicInfo.dob}</span>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label">Gender</span>
              <span className="detail-value">{basicInfo.gender}</span>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label">SSN</span>
              <span className="detail-value">{basicInfo.ssn}</span>
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
                <button className="card-header-link" onClick={() => setIsEditAddressOpen(true)}>Edit address</button>
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
                <a href="#training" className="card-header-link">
                  Start a training
                  <img src={arrowIcon} alt="arrow" className="link-arrow-icon" />
                </a>
              </div>
              <div className="profile-card-body empty-state">
                <div className="empty-badge">
                  <img src={certificateIcon} alt="Medal" className="empty-badge-icon" />
                </div>
                <p className="empty-main-text">Nothing here yet.</p>
                <p className="empty-sub-text">Add a skill to get started</p>
              </div>
            </div>

            {/* Card 6: Recommended Certifications */}
            <div className="profile-card certifications-card">
              <div className="profile-card-header">
                <div className="title-with-badge">
                  <h3 className="card-title">Recommended Certifications</h3>
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
    </div>
  );
}
