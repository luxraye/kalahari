/**
 * Security & Access Control Configuration
 * Centralized master admin definitions and privilege validation helpers.
 */

export const MASTER_ADMIN_EMAILS = [
  "gnakedi@bloodchain.life",
  "taylith338@gmail.com"
];

export const MASTER_ADMIN_EMAIL = "gnakedi@bloodchain.life";

/**
 * Validates whether an email belongs to the authorized platform architect whitelist
 */
export function isMasterAdminEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return MASTER_ADMIN_EMAILS.includes(email.trim().toLowerCase());
}

/**
 * Validates that a user profile payload does not contain unauthorized privilege escalation
 */
export function validateUserProfileSecurity(profileData, requesterEmail) {
  const isRequesterAdmin = isMasterAdminEmail(requesterEmail);
  
  if (profileData && profileData.role === 'admin' && !isRequesterAdmin) {
    throw new Error("Privilege escalation rejected: Only master admin accounts can hold role 'admin'.");
  }

  return {
    ...profileData,
    role: isRequesterAdmin ? 'admin' : 'client'
  };
}
