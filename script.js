const filters = document.querySelectorAll('.filter');
const rows = document.querySelectorAll('.launch-row');
const toast = document.querySelector('.toast');
const modal = document.getElementById('modal');

filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const riskOnly = button.dataset.filter === 'risk';
  rows.forEach(row => row.hidden = riskOnly && row.dataset.risk !== 'true');
}));

document.getElementById('applyInsight').addEventListener('click', () => {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3600);
});

function openModal(title) {
  if (title) document.getElementById('modalTitle').innerHTML = `${title}<br>Technical deployment detail.`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

document.getElementById('execBriefBtn').addEventListener('click', () => {
  document.getElementById('modalTitle').innerHTML = 'Portfolio is controlled.<br>One owner decision required.';
  openModal();
});

rows.forEach(row => row.addEventListener('click', () => openModal(row.dataset.client)));
document.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => openModal()));
document.querySelectorAll('.modal-close,.modal-close-action').forEach(button => button.addEventListener('click', closeModal));
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

document.querySelector('.copy-brief').addEventListener('click', async () => {
  const text = 'Steering brief: 91% of technical stage gates are on time across seven deployments. Decision: Northstar CIO to assign an identity owner today or move cutover one week.';
  try { await navigator.clipboard.writeText(text); } catch (_) {}
  closeModal();
  toast.querySelector('strong').textContent = 'Steering brief copied';
  toast.querySelector('small').textContent = 'Ready to share with your stakeholder team.';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
});

document.querySelector('.mobile-menu').addEventListener('click', () => document.body.classList.toggle('menu-open'));
document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('click', () => {
  document.querySelectorAll('.nav-item').forEach(link => link.classList.remove('active'));
  item.classList.add('active');
  document.body.classList.remove('menu-open');
}));

const guideLibrary = {
  sso: {
    kicker: 'IDENTITY · CORE FLUENCY', title: 'SSO & SAML readiness',
    intro: 'Lead the identity workstream from discovery to production sign-off without needing to become the identity engineer.',
    lessons: [
      ['Understand the exchange', `<h3>What is actually happening?</h3><p class="lesson-lead">The hospital is the <strong>Identity Provider (IdP)</strong>; the SaaS application is the <strong>Service Provider (SP)</strong>. The IdP authenticates the clinician and posts a signed SAML assertion to the SP’s Assertion Consumer Service URL.</p><div class="guide-callout"><strong>MENTAL MODEL</strong><p>A badge office vouches for the clinician. The assertion says who they are and may carry attributes such as email, role and organisation. The application validates the signature before granting access.</p></div><h4>Know these six terms</h4><ul><li><strong>Entity ID:</strong> unique identifier for the IdP or SP.</li><li><strong>ACS / Reply URL:</strong> where the IdP posts its response.</li><li><strong>Claim / attribute:</strong> a user fact passed in the assertion.</li><li><strong>NameID:</strong> the primary user identifier; agree whether it is email or an immutable ID.</li><li><strong>Signing certificate:</strong> lets the SP verify the assertion is genuine.</li><li><strong>Metadata XML:</strong> machine-readable endpoints, identifiers and certificates.</li></ul>`],
      ['Run discovery', `<h3>Identity discovery checklist</h3><p class="lesson-lead">Complete this before confirming a date. “The customer has SSO” is not readiness evidence.</p><ol><li>Name the hospital <strong>identity owner</strong> and application administrator.</li><li>Confirm IdP: Entra ID, Okta, ADFS or another platform.</li><li>Agree protocol and flow: SAML/OIDC, SP-initiated/IdP-initiated.</li><li>Exchange Entity ID, ACS URL, sign-on URL and metadata securely.</li><li>Define NameID plus required claims and exact formats.</li><li>Agree role/group mapping and least-privilege access.</li><li>Confirm MFA and Conditional Access behavior.</li><li>Define joiner, mover and leaver provisioning; clarify whether SCIM is in scope.</li><li>Record certificate expiry owner and renewal process.</li><li>Create test users: standard clinician, admin, disabled user and invalid role.</li></ol><div class="guide-callout"><strong>GATE EVIDENCE</strong><p>Signed attribute map, named owners, non-production metadata exchanged, test identities created and test date booked.</p></div>`],
      ['Test & troubleshoot', `<h3>Prove the happy and unhappy paths</h3><table class="guide-table"><tr><th>Test</th><th>Expected evidence</th></tr><tr><td>Valid clinician</td><td>Correct account and role; no duplicate user</td></tr><tr><td>Unassigned user</td><td>Access denied cleanly</td></tr><tr><td>Wrong/missing claim</td><td>Useful error captured in logs</td></tr><tr><td>Expired session</td><td>Re-authentication follows policy</td></tr><tr><td>Disabled user</td><td>Access revoked in agreed timeframe</td></tr></table><h4>Common failure modes</h4><ul><li>NameID does not match the application’s user key.</li><li>Group names or role values differ by case or environment.</li><li>Clock skew makes an otherwise valid assertion appear expired.</li><li>Production ACS URL differs from the tested URL.</li><li>Signing certificate changes without coordinated rollover.</li></ul><div class="guide-callout"><strong>YOUR ESCALATION</strong><p>State the failed transaction, exact timestamp, correlation ID, environment, expected result, actual result, evidence owner and impact on the gate.</p></div>`],
      ['Official references', `<h3>Learn from primary sources</h3><p class="lesson-lead">Use these to deepen the guide and validate tenant-specific decisions.</p><div class="guide-links"><a href="https://learn.microsoft.com/en-us/entra/identity-platform/single-sign-on-saml-protocol" target="_blank" rel="noopener">Microsoft: SAML protocol and request/response flow ↗</a><a href="https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/add-application-portal-setup-sso" target="_blank" rel="noopener">Microsoft: Enable and test SAML SSO ↗</a><a href="https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/plan-sso-deployment" target="_blank" rel="noopener">Microsoft: Plan an SSO deployment ↗</a></div>`]
    ]
  },
  ehr: {
    kicker:'INTEGRATIONS · CORE FLUENCY', title:'EHR integration patterns', intro:'Choose the smallest integration pattern that solves the clinical workflow and can be safely supported.',
    lessons:[
      ['Map the workflow',`<h3>Start with work, not interfaces</h3><p class="lesson-lead">Write the clinical workflow as a sequence: actor, trigger, information needed, action, destination and confirmation.</p><ol><li>Who launches the application, and from where?</li><li>What patient and encounter context must arrive?</li><li>What does the clinician create or change?</li><li>What must return to the EHR—and in what status?</li><li>Who reviews, signs and corrects it?</li><li>What is the safe fallback when the integration is unavailable?</li></ol><div class="guide-callout"><strong>KEY PRINCIPLE</strong><p>“Integrate with Epic” is not a requirement. “Launch in the patient chart with encounter context and return a draft note for clinician review” is.</p></div>`],
      ['Choose a pattern',`<h3>Know the common patterns</h3><table class="guide-table"><tr><th>Pattern</th><th>Use it when</th><th>Watch for</th></tr><tr><td>Contextual launch</td><td>User needs patient context and SSO from the chart</td><td>Launch context, SMART scopes, workflow placement</td></tr><tr><td>FHIR API</td><td>Resources can be read/written through supported endpoints</td><td>R4 version, scopes, profiles, rate limits</td></tr><tr><td>HL7 v2 feed</td><td>Event-driven ADT/order/result messages are established</td><td>Local segments, code sets, acknowledgements</td></tr><tr><td>Document write-back</td><td>A note/document returns to a chart location</td><td>Draft vs final, author, encounter linkage</td></tr><tr><td>Embedded/lightweight</td><td>Value can be delivered with minimal data exchange</td><td>Manual steps and duplicate entry</td></tr></table>`],
      ['Scope the interface',`<h3>Produce an integration context diagram</h3><p class="lesson-lead">One page should show systems, environments, direction, protocol, data objects, owners and trust boundaries.</p><h4>Readiness questions</h4><ul><li>Exact EHR product, version, hosting model and site variation?</li><li>Sandbox and production endpoints available?</li><li>Existing interface engine and customer integration team?</li><li>Required resources/messages, fields, code systems and volumes?</li><li>Authentication, network route, allowlisting and certificate needs?</li><li>Who validates clinical meaning—not merely message delivery?</li><li>Monitoring, retry, reconciliation and support ownership?</li></ul><div class="guide-callout"><strong>GATE EVIDENCE</strong><p>Approved workflow, context diagram, field-level contract, test-data plan, non-production connectivity and named clinical validator.</p></div>`],
      ['Official references',`<h3>Vendor starting points</h3><div class="guide-links"><a href="https://open.epic.com/" target="_blank" rel="noopener">Epic on FHIR / open.epic developer resources ↗</a><a href="https://docs.oracle.com/en/industries/health/millennium-platform-apis/apis.html" target="_blank" rel="noopener">Oracle Health Millennium platform APIs ↗</a><a href="https://hl7.org/fhir/R4/overview.html" target="_blank" rel="noopener">HL7 FHIR R4 overview ↗</a></div><div class="guide-callout"><strong>REMEMBER</strong><p>Customer configuration, licensed modules and supported versions vary. Validate against the health system’s actual environment.</p></div>`]
    ]
  },
  hl7:{kicker:'INTEROPERABILITY · TECHNICAL FLUENCY',title:'HL7 & FHIR essentials',intro:'Build enough interoperability literacy to frame requirements, test meaning and challenge ambiguous updates.',lessons:[
    ['Separate the standards',`<h3>HL7 v2 and FHIR are different tools</h3><p class="lesson-lead"><strong>HL7 v2</strong> commonly sends event messages through interfaces. <strong>FHIR</strong> represents healthcare concepts as resources and commonly exposes them through REST APIs.</p><table class="guide-table"><tr><th></th><th>HL7 v2</th><th>FHIR</th></tr><tr><td>Shape</td><td>Delimited messages</td><td>JSON/XML resources</td></tr><tr><td>Typical use</td><td>ADT, orders, results</td><td>App access and resource exchange</td></tr><tr><td>Interaction</td><td>Events and acknowledgements</td><td>Read/search/create/update</td></tr><tr><td>Variation</td><td>Local Z-segments</td><td>Profiles and implementation guides</td></tr></table>`],
    ['Read the nouns',`<h3>Recognise what the team is discussing</h3><ul><li><strong>ADT:</strong> admission, discharge and transfer events; often establishes patient/encounter context.</li><li><strong>ORU:</strong> observation result message.</li><li><strong>ACK/NACK:</strong> accepted or rejected message acknowledgement.</li><li><strong>FHIR resource:</strong> a defined concept such as Patient, Encounter, Practitioner or DocumentReference.</li><li><strong>Profile:</strong> constraints applied to a base FHIR resource for a use case.</li><li><strong>Terminology:</strong> coded meaning such as SNOMED CT, LOINC or local codes.</li><li><strong>SMART on FHIR:</strong> authorization and launch conventions for apps using FHIR.</li></ul><div class="guide-callout"><strong>LEADERSHIP QUESTION</strong><p>“Did the message arrive?” tests transport. “Did the right encounter, clinician, status and clinical meaning arrive?” tests the deployment.</p></div>`],
    ['Validate end to end',`<h3>Build a scenario-based test pack</h3><ol><li>Define representative journeys, including corrections and cancellations.</li><li>Create synthetic test patients; never improvise with production health data.</li><li>Trace source event → interface engine → receiving application → acknowledgement.</li><li>Validate identifiers, timestamps, time zones, code mappings and encounter linkage.</li><li>Test duplicates, out-of-order events, missing optional fields and downtime recovery.</li><li>Get clinical validation of meaning and operational validation of workflow.</li><li>Record evidence and defects against entry/exit criteria.</li></ol>`],
    ['Official references',`<h3>Standards references</h3><div class="guide-links"><a href="https://hl7.org/fhir/R4/overview.html" target="_blank" rel="noopener">HL7: FHIR R4 overview ↗</a><a href="https://hl7.org/fhir/R4/http.html" target="_blank" rel="noopener">HL7: FHIR RESTful API ↗</a><a href="https://hl7.org/fhir/R4/resourcelist.html" target="_blank" rel="noopener">HL7: FHIR resource index ↗</a></div>`]
  ]},
  security:{kicker:'GOVERNANCE · READINESS',title:'Security & environment readiness',intro:'Convert broad assurance conversations into owned requirements and evidence before dates are committed.',lessons:[
    ['Discover the environment',`<h3>Run one structured readiness workshop</h3><ul><li>Hosting and data residency requirements by region.</li><li>Data classification, flows, storage, retention and deletion.</li><li>Network routes, proxies, firewall rules, DNS and allowlisting.</li><li>Identity, privileged access and service-account policies.</li><li>Endpoint/browser/device constraints and managed-device policies.</li><li>Logging, audit, monitoring and incident-notification requirements.</li><li>Business continuity, downtime and disaster-recovery expectations.</li><li>Security assessment, privacy review and clinical safety approvals.</li></ul>`],
    ['Create the evidence pack',`<h3>Turn each claim into evidence</h3><table class="guide-table"><tr><th>Requirement</th><th>Evidence</th><th>Owner</th></tr><tr><td>Data location</td><td>Architecture/data-flow diagram</td><td>Solution architect</td></tr><tr><td>Access control</td><td>Role matrix and SSO design</td><td>Identity owner</td></tr><tr><td>Security controls</td><td>Current assurance documents</td><td>Security</td></tr><tr><td>Clinical approval</td><td>Signed safety/governance record</td><td>Clinical safety owner</td></tr><tr><td>Production support</td><td>RACI and escalation path</td><td>Service owner</td></tr></table><div class="guide-callout"><strong>CONTROL</strong><p>A questionnaire being “with Security” is status. A named reviewer, response date, open exceptions and decision authority is a controlled dependency.</p></div>`],
    ['Gate the work',`<h3>Minimum environment-ready exit criteria</h3><ol><li>Architecture and data flows approved.</li><li>Material security/privacy exceptions accepted by authorised owners.</li><li>Non-production connectivity proven.</li><li>Production change window and change authority confirmed.</li><li>Monitoring and operational ownership agreed.</li><li>Rollback and downtime path documented.</li><li>No critical requirement remains ownerless.</li></ol>`],
    ['Practice scenario',`<h3>Scenario: procurement says “nearly done”</h3><p class="lesson-lead">The contract is signed, but the hospital has not approved the data-flow diagram and production allowlisting needs a 15-business-day change lead time.</p><div class="guide-callout"><strong>YOUR CALL</strong><p>Do not accept the original go-live as green. Make environment approval and the allowlisting change explicit critical-path gates, show the last responsible decision date, and offer sequencing options rather than silently consuming contingency.</p></div>`]
  ]},
  cutover:{kicker:'DELIVERY · PRODUCTION CONTROL',title:'Cutover & stabilisation',intro:'Move into production deliberately, preserve reversibility and hand over an operable service—not a fragile go-live.',lessons:[
    ['Design backward',`<h3>Start with the safe production state</h3><ol><li>Define go-live scope by site, cohort, workflow and features.</li><li>Specify measurable go/no-go criteria and decision authority.</li><li>Work backward through production change, migration/configuration, testing and communications.</li><li>Name every timed action, owner, dependency and verification.</li><li>Define abort thresholds and the latest safe rollback point.</li></ol>`],
    ['Run go/no-go',`<h3>Make the decision evidence-based</h3><table class="guide-table"><tr><th>Domain</th><th>Question</th></tr><tr><td>Technical</td><td>Are production connectivity, SSO, interfaces and monitoring proven?</td></tr><tr><td>Clinical</td><td>Is the workflow safe, approved and understood?</td></tr><tr><td>Operational</td><td>Are support, communications and downtime paths staffed?</td></tr><tr><td>Commercial</td><td>Are scope and material exceptions accepted?</td></tr></table><div class="guide-callout"><strong>RULE</strong><p>No green-by-silence. Each accountable owner explicitly states go, conditional go or no-go, with conditions recorded.</p></div>`],
    ['Stabilise',`<h3>Define hypercare before launch</h3><ul><li>Command-centre hours, channels and decision lead.</li><li>Severity definitions and response targets.</li><li>Live telemetry: authentication, interface failures, latency and active users.</li><li>Daily defect, adoption and workflow review.</li><li>Known-issue register and customer communications.</li><li>Exit criteria: stable trend, no critical defects, support documentation accepted, CS/service owner ready.</li></ul>`],
    ['Use the runbook',`<h3>Minimum cutover runbook fields</h3><p class="lesson-lead">Sequence, planned time, action, accountable owner, verifier, prerequisites, expected evidence, actual time, status, abort impact and rollback step.</p><div class="guide-callout"><strong>PRACTICE</strong><p>Tabletop the runbook with a failed SSO test 30 minutes before launch and an HL7 backlog two hours after launch. If decision rights are unclear in rehearsal, they will be worse in production.</p></div>`]
  ]},
  scope:{kicker:'PRODUCT JUDGMENT · DECISION QUALITY',title:'Build vs configure',intro:'Classify requests consistently so real product gaps reach Product and deployment problems stay out of the roadmap.',lessons:[
    ['Classify the request',`<h3>Use four explicit categories</h3><table class="guide-table"><tr><th>Category</th><th>Test</th></tr><tr><td>Configuration</td><td>Supported capability; tenant/site values or mapping need adjustment</td></tr><tr><td>Deployment</td><td>Environment, dependency, sequencing, ownership or execution issue</td></tr><tr><td>Defect</td><td>Documented supported behavior fails reproducibly</td></tr><tr><td>Product gap</td><td>Required outcome is not supported and has repeatable market value</td></tr></table>`],
    ['Run the evidence test',`<h3>Do not escalate a label—escalate evidence</h3><ol><li>State the user and clinical outcome, not the requested solution.</li><li>Reproduce with environment, inputs, timestamps and logs.</li><li>Compare against documented/supported behavior.</li><li>Test known configuration and workflow alternatives.</li><li>Estimate frequency, affected users, safety and go-live impact.</li><li>Identify whether the need repeats across customers.</li><li>Record recommendation, decision owner and reversible next step.</li></ol>`],
    ['Make the call',`<h3>Decision record template</h3><ul><li><strong>Problem:</strong> observable workflow and outcome.</li><li><strong>Evidence:</strong> reproduction, logs and current capability.</li><li><strong>Classification:</strong> configuration, deployment, defect or gap.</li><li><strong>Options:</strong> time, risk, support burden and customer impact.</li><li><strong>Decision:</strong> what, why, owner and date.</li><li><strong>Revisit trigger:</strong> new evidence or threshold that changes the call.</li></ul><div class="guide-callout"><strong>EXECUTIVE LANGUAGE</strong><p>“This is configuration. The existing mapping pattern meets the clinical outcome in four days. A new build adds eight days, creates support variance and is not required for go-live.”</p></div>`],
    ['Practice scenario',`<h3>Scenario: “Put it on the roadmap”</h3><p class="lesson-lead">A site says its ADT feed is unique and requests a new integration. Logs show the difference is a local code in an existing field; the interface mapping layer already supports translation.</p><div class="guide-callout"><strong>CLASSIFICATION</strong><p>Configuration. Validate the mapping with synthetic messages, record it in the site configuration, regression-test the standard path and keep the roadmap escalation closed.</p></div>`]
  ]}
};

const guideModal = document.getElementById('guideModal');
const guideContent = document.getElementById('guideContent');
const guideNav = document.getElementById('guideNav');
let activeGuide = null;
const completedGuides = new Set(JSON.parse(localStorage.getItem('completedGuides') || '[]'));

function updateGuideProgress() {
  document.getElementById('progressCount').textContent = completedGuides.size;
  document.querySelectorAll('.guide-card').forEach(card => card.classList.toggle('completed', completedGuides.has(card.dataset.guide)));
}

function showLesson(index) {
  const guide = guideLibrary[activeGuide];
  guideContent.innerHTML = guide.lessons[index][1];
  guideNav.querySelectorAll('button').forEach((button, i) => button.classList.toggle('active', i === index));
}

function openGuide(key) {
  activeGuide = key;
  const guide = guideLibrary[key];
  document.getElementById('guideKicker').textContent = guide.kicker;
  document.getElementById('guideTitle').textContent = guide.title;
  document.getElementById('guideIntro').textContent = guide.intro;
  guideNav.innerHTML = guide.lessons.map((lesson, index) => `<button data-lesson="${index}"><span>${index + 1}</span>${lesson[0]}</button>`).join('');
  guideNav.querySelectorAll('button').forEach(button => button.addEventListener('click', () => showLesson(Number(button.dataset.lesson))));
  const completeButton = document.getElementById('completeGuide');
  completeButton.textContent = completedGuides.has(key) ? 'Completed ✓' : 'Mark guide complete';
  completeButton.classList.toggle('done', completedGuides.has(key));
  showLesson(0);
  guideModal.classList.add('open');
  guideModal.setAttribute('aria-hidden', 'false');
}

document.querySelectorAll('.guide-card').forEach(card => card.addEventListener('click', () => openGuide(card.dataset.guide)));
document.querySelector('.guide-close').addEventListener('click', () => { guideModal.classList.remove('open'); guideModal.setAttribute('aria-hidden', 'true'); });
guideModal.addEventListener('click', event => { if (event.target === guideModal) document.querySelector('.guide-close').click(); });
document.getElementById('completeGuide').addEventListener('click', event => {
  completedGuides.add(activeGuide);
  localStorage.setItem('completedGuides', JSON.stringify([...completedGuides]));
  event.currentTarget.textContent = 'Completed ✓';
  event.currentTarget.classList.add('done');
  updateGuideProgress();
});
document.addEventListener('keydown', event => { if (event.key === 'Escape' && guideModal.classList.contains('open')) document.querySelector('.guide-close').click(); });
updateGuideProgress();
