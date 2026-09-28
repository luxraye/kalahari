import { test } from 'node:test';
import assert from 'node:assert/strict';
import { 
  MASTER_ADMIN_EMAILS, 
  isMasterAdminEmail,
  validateUserProfileSecurity 
} from '../src/config/securityConfig.js';

test('MASTER_ADMIN_EMAILS contains only authorized platform architects', () => {
  assert.ok(MASTER_ADMIN_EMAILS.includes('gnakedi@bloodchain.life'));
  assert.ok(MASTER_ADMIN_EMAILS.includes('taylith338@gmail.com'));
  assert.equal(MASTER_ADMIN_EMAILS.length, 2);
});

test('isMasterAdminEmail correctly accepts authorized emails', () => {
  assert.equal(isMasterAdminEmail('gnakedi@bloodchain.life'), true);
  assert.equal(isMasterAdminEmail('GNAKEDI@BLOODCHAIN.LIFE'), true);
  assert.equal(isMasterAdminEmail('taylith338@gmail.com'), true);
});

test('isMasterAdminEmail rejects unauthorized arbitrary emails', () => {
  const unauthorizedEmails = [
    'attacker@malicious.com',
    'admin@random.co.bw',
    'guest@kalahari.ai',
    'imposter@bloodchain.life.evil.com',
    '',
    null,
    undefined
  ];

  for (const email of unauthorizedEmails) {
    assert.equal(isMasterAdminEmail(email), false, `Email ${email} should NOT qualify as master admin`);
  }
});

test('validateUserProfileSecurity rejects privilege escalation from arbitrary users', () => {
  assert.throws(() => {
    validateUserProfileSecurity({ role: 'admin', company: 'Bad Actor Ltd' }, 'hacker@example.com');
  }, /Privilege escalation rejected/);

  // Legitimate admin user passes
  const validAdmin = validateUserProfileSecurity({ company: 'Kalahari Ops' }, 'gnakedi@bloodchain.life');
  assert.equal(validAdmin.role, 'admin');

  // Normal client profile receives client role
  const client = validateUserProfileSecurity({ company: 'Gaborone Freight' }, 'client@freight.co.bw');
  assert.equal(client.role, 'client');
});
