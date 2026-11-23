/* =============================================================================
   data.js  —  ALL EDITABLE CONTENT LIVES HERE
   =============================================================================
   You never need to touch index.html or main.js to change text.
   Rules of thumb:
     • Text goes inside 'single quotes' (or "double quotes" if it contains a ').
     • Every item in a [ list ] is separated by a comma.
     • Every field in a { block } is "name: value," — keep the comma at the end.
     • If something breaks, open the browser console (F12) — it shows the line.
     • Keep outcomes honest. Where a number would help, put [your number] first
       and replace it once you are sure of the real figure.
   ========================================================================== */

const PORTFOLIO = {

  /* ---------------------------------------------------------------------------
     1. IDENTITY
     --------------------------------------------------------------------------- */
  name: 'Mohammed Abdul Moin Shaik',   // Full name (hero, footer, page title)
  nickname: 'Moin',                    // Short / preferred name used in greetings
  monogram: 'MS',                      // 2 letters shown on the avatar fallback & nav logo
  location: 'India',                   // Shown in hero + contact
  availability: 'Immediate Joiner',    // Text of the glowing hero badge. Set to '' to hide it.
  openTo: 'Open to remote & relocation', // Small line under the hero buttons. '' to hide.

  /* Rotating headline: the typed words after "I am a …".
     Add / remove / reorder freely. Each one must match an item in `roles` below
     only if you want it to appear in the "View my profile as" switcher. */
  kicker: 'Cloud Operations  ·  Site Reliability',
  headlineRoles: [
    'Cloud Operations Engineer',
    'Site Reliability Engineer'
  ],

  /* One-line headline under the typed role. */
  tagline: 'I run cloud access, incidents and monitoring so services stay up and teams know what to do next.',

  /* Hero paragraph(s). Each string is one paragraph. */
  summary: [
    'Cloud operations and site reliability engineer with 11+ years in IT. I administer cloud access, triage and escalate incidents, and turn tools into services people can actually run.',
    'Most recently, remote with Al Jazeera Media Network on GCP and Azure: IAM and SSO, monitoring and alerts, log-based diagnosis, SOPs, and stakeholder updates through breaking news and live events.'
  ],

  /* ---------------------------------------------------------------------------
     2. CONTACT
     --------------------------------------------------------------------------- */
  /* PRIVATE: email and phone are NOT written here. The deploy workflow fills these two
     placeholders from GitHub repository secrets SITE_EMAIL and SITE_PHONE. */
  email: '__SITE_EMAIL__',

  phone: '__SITE_PHONE__',

  /* Social links. Leave '' (empty) to hide a button; paste the full URL to show it. */
  links: {
    linkedin: '',   // e.g. 'https://www.linkedin.com/in/your-handle/'
    github: ''      // e.g. 'https://github.com/your-username'
  },

  /* Text for the contact section */
  contactHeading: "Let's keep your services running.",
  contactText: 'Immediate joiner. Open to remote work or relocation. Email or phone, both are monitored.',

  /* ---------------------------------------------------------------------------
     3. SECTIONS — order and visibility
     ---------------------------------------------------------------------------
     The ORDER of this list is the order on the page (the hero is always first,
     the footer always last). `nav` is the label in the top menu.
     Set show:false to hide a section completely.                              */
  sections: [
    { id: 'connect',      nav: 'Story',        show: true },
    { id: 'roles',        nav: 'Role View',    show: false },
    { id: 'skills',       nav: 'Skills',       show: true },
    { id: 'experience',   nav: 'Experience',   show: true },
    { id: 'projects',     nav: 'Case Studies', show: true },
    { id: 'achievements', nav: 'Highlights',   show: true },
    { id: 'education',    nav: 'Education',    show: true },
    { id: 'cv',           nav: 'CV',           show: true },
    { id: 'contact',      nav: 'Contact',      show: true }
  ],

  /* ---------------------------------------------------------------------------
     4. HERO STAT COUNTERS (animate when scrolled into view)
     ---------------------------------------------------------------------------
     value  = number to count up to      suffix = text after the number ('+')
     label  = caption                    sub    = small grey line (optional)   */
  stats: [
    { value: 11, suffix: '+', label: 'Years of experience', sub: 'Sep 2015 – Nov 2026' },
    { value: 4,  suffix: '',  label: 'Cloud platforms',     sub: 'GCP · Azure · AWS · IBM Cloud' },
    { value: 5,  suffix: '',  label: 'Companies',           sub: 'Media, AI, banking, healthcare' }
  ],

  /* ---------------------------------------------------------------------------
     5. HOW MY ROLES CONNECT  (the "one coherent story" section)
     ---------------------------------------------------------------------------
     statement = the big line.  intro = paragraph under it.
     pillars   = the six strands. `icon` is a short symbol/emoji-free glyph.   */
  connect: {
    statement: 'One job: keep cloud services reliable, and make them operable by the people who depend on them.',
    intro: 'Cloud Operations Engineer and Site Reliability Engineer are the same work seen from two sides. Both are access, incidents, monitoring, documentation and clear communication. That is the work I do, and the only roles this site is aimed at.',
    pillars: [
      {
        icon: '⚑', title: 'Cloud IAM',
        text: 'SSO, least privilege, access audits, joiner and leaver workflows, and retirement of shared accounts across GitHub and the SaaS estate.',
        roles: 'Okta · Google SSO · GitHub IAM'
      },
      {
        icon: '◎', title: 'Incidents',
        text: 'Triage, severity, escalation and RCA with Opsgenie, incident.io and Jira. Stakeholders get a clear update, not a silence.',
        roles: 'Opsgenie · Jira · SLOs'
      },
      {
        icon: '◉', title: 'Monitoring & logs',
        text: 'Uptime checks, alert policies and log reading on GCP, Azure, Zabbix and Splunk, including an in-house monitoring platform I architected with my team.',
        roles: 'Cloud Monitoring · Zabbix · Splunk'
      },
      {
        icon: '☰', title: 'SOPs & operationalisation',
        text: 'Runbooks, Confluence, ownership and change windows so a tool keeps working after the person who set it up has moved on.',
        roles: 'Runbooks · Confluence · Ownership'
      }
    ]
  },

  /* ---------------------------------------------------------------------------
     6. ROLES — powers the typed headline pitch and the "View my profile as" switcher
     ---------------------------------------------------------------------------
     id        unique short id (used by projects[].roles and cv[].role)
     title     name shown on the switcher chip
     pitch     short tailored pitch (first person)
     strengths 3–4 bullet points shown next to the pitch
     focus     skill names (must match names in `skills` below) to highlight
     projects  project ids (from `projects` below) to mark "Most relevant"      */
  roles: [
    {
      id: 'sre', title: 'Site Reliability Engineer',
      pitch: "I treat reliability as a product feature. I define and report SLOs and SLAs, design monitoring that catches problems before users do, run incidents through to a proper RCA, and automate the toil that would otherwise repeat.",
      strengths: [
        'Unified monitoring: infrastructure, browser-journey and synthetic monitors in one place',
        'Opsgenie, incident.io and Jira Service Management incident flow with RCA discipline',
        'Event-driven alert pipeline: dedupe, correlate, enrich, page',
        'Zabbix and Cloud Monitoring, with PromQL, MQL, Grafana and Splunk exposure'
      ],
      focus: ['GCP', 'Cloud Monitoring', 'Zabbix', 'Grafana', 'Prometheus / PromQL', 'MQL', 'Splunk', 'Opsgenie', 'incident.io',
              'SLO / SLA / error budgets', 'RCA', 'Python', 'Terraform', 'Kubernetes', 'Pub/Sub', 'Cloud Run', 'Vertex AI'],
      projects: ['unified-monitoring', 'zabbix-upgrade', 'media-monitoring', 'azure-gcp-migration']
    },
    {
      id: 'cloudops', title: 'Cloud Operations Engineer',
      pitch: "I run GCP and Azure estates day to day: monitoring, lifecycle and retirement assessments, access, cost. I make migrations boring, with a parallel run, reconcile, cut over and decommission, and I keep an eye on FinOps while I do it.",
      strengths: [
        'GCP and Azure operations, with AWS and IBM Cloud exposure',
        'Quarterly cloud lifecycle and retirement assessments',
        'FinOps across compute, storage, egress and AI services',
        'Migration automation: Azure web tests to GCP uptime checks'
      ],
      focus: ['GCP', 'Azure', 'AWS', 'IBM Cloud', 'Cloud Run', 'Pub/Sub', 'BigQuery', 'IAM', 'Secret Manager', 'IAP',
              'Azure Monitor', 'Application Insights', 'Cloud Monitoring', 'FinOps', 'Terraform', 'Google Apps Script'],
      projects: ['azure-gcp-migration', 'unified-monitoring', 'zabbix-upgrade', 'identity-governance']
    },
    {
      id: 'cloudsupport', title: 'Cloud Support Engineer',
      pitch: "I'm the engineer who can read the logs, reproduce the problem, explain it clearly to the customer and still fix the underlying cause. Cloud fundamentals, IAM and monitoring, delivered with a support mindset.",
      strengths: [
        'Triage and escalation across GCP, Azure and AWS basics',
        'IAM, SSO and access troubleshooting',
        'Clear written RCAs and runbooks for the next person',
        'Production support for cloud-hosted banking AI solutions'
      ],
      focus: ['GCP', 'Azure', 'AWS', 'IAM', 'Okta / Google SSO', 'Cloud Monitoring', 'Azure Monitor', 'Jira / JSM', 'Confluence',
              'ITIL (incident / problem / change)', 'RCA', 'Runbooks', 'Splunk'],
      projects: ['ai-production-support', 'identity-governance', 'azure-gcp-migration', 'media-monitoring']
    },
    {
      id: 'service', title: 'Service Engineer',
      pitch: "I treat business-critical tools (CMS, video platform, short-URL and identity services) as services with owners, SLAs, runbooks and monitoring, and I build the glue between those platforms and the engineering teams that depend on them.",
      strengths: [
        'Operational bridge for Universal CMS (uCMS) and Brightcove Video Cloud',
        'Zero-downtime short-URL domain migrations',
        'Least-privilege editorial role groups',
        'Service health monitoring for publishing, live streams and feeds'
      ],
      focus: ['Brightcove', 'uCMS', 'Bl.ink', 'Google Workspace admin', 'Okta / Google SSO', 'Opsgenie', 'incident.io', 'Jira / JSM',
              'Cloud Monitoring', 'Chartbeat', 'GA4', 'Amplitude', 'Apple News Publisher', 'Vertex AI Gemini', 'Python'],
      projects: ['business-ops', 'media-monitoring', 'identity-governance', 'unified-monitoring']
    },
    {
      id: 'ops', title: 'Operations Engineer',
      pitch: "I keep the machinery of a digital newsroom turning: access, onboarding and offboarding, audits, domains and compliance requests, all done with checklists, automation and calm under breaking-news pressure.",
      strengths: [
        'Periodic access audits across GitHub, Chartbeat, GA4, Amplitude, LastPass, Bl.ink and OpenVPN',
        'Mandatory SSO adoption and deprecation of shared accounts',
        'Compliance requests and digital forensics on infringing domains',
        'Runbooks and SOPs that survive staff turnover'
      ],
      focus: ['Okta / Google SSO', 'LastPass', 'OpenVPN', 'AppGate', 'GitHub IAM & Teams', 'Access governance', 'Google Workspace admin',
              'Brightcove', 'uCMS', 'Bl.ink', 'Jira / JSM', 'Confluence', 'Runbooks', 'Google Apps Script', 'FinOps'],
      projects: ['identity-governance', 'business-ops', 'media-monitoring', 'azure-gcp-migration']
    },
    {
      id: 'techsupport', title: 'Technical Support Engineer',
      pitch: "I translate between people and platforms: listen carefully, reproduce quickly, escalate with context, and close the loop with documentation. My support background spans global banking clients, editorial teams and healthcare data operations.",
      strengths: [
        'Led a production support team for AI bots and AI applications',
        'Triage, escalation, SLA tracking and RCA',
        'Python automations for incident and access management',
        'Clear runbooks and Confluence knowledge bases'
      ],
      focus: ['Jira / JSM', 'Confluence', 'ITIL (incident / problem / change)', 'RCA', 'Runbooks', 'Python', 'SQL', 'Splunk',
              'Okta / Google SSO', 'Google Workspace admin', 'Opsgenie', 'incident.io', 'REST APIs'],
      projects: ['ai-production-support', 'identity-governance', 'business-ops', 'media-monitoring']
    },
    {
      id: 'devops', title: 'DevOps Engineer',
      pitch: "I automate the boring parts end to end: APIs, scheduled jobs, secrets handling and event-driven pipelines. My recent work includes a Cloud Run, Pub/Sub and Cloud Tasks alert pipeline and a Google Apps Script migration engine that drove the Azure and GCP APIs.",
      strengths: [
        'Event-driven architecture on Cloud Run, Pub/Sub and Cloud Tasks',
        'Infrastructure automation with REST APIs, OAuth and service principals',
        'Git/GitHub workflows, Jenkins and GitHub Actions, Docker, Terraform',
        'Secrets, locking, batching and idempotent automation'
      ],
      focus: ['Python', 'Bash', 'Google Apps Script', 'REST APIs', 'Terraform', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions',
              'Git / GitHub', 'Cloud Run', 'Pub/Sub', 'Cloud Tasks', 'Secret Manager', 'GCP', 'Azure', 'Vertex AI'],
      projects: ['unified-monitoring', 'azure-gcp-migration', 'zabbix-upgrade', 'ibm-watson-pocs']
    },
    {
      id: 'prodsupport', title: 'Production Support Engineer',
      pitch: "I've carried the pager and led the team behind it. From high-traffic editorial deployments, breaking news and major sporting events to global banking AI applications, I know how to triage fast, communicate clearly, and make sure it does not happen again.",
      strengths: [
        'Led production support for AI bots and applications for global banking clients',
        'Incident management with Opsgenie, incident.io and JSM',
        'Banking change control and audits',
        'Support through high-traffic editorial deployments and major live events'
      ],
      focus: ['Opsgenie', 'incident.io', 'Jira / JSM', 'ITIL (incident / problem / change)', 'RCA', 'SLO / SLA / error budgets',
              'Splunk', 'Zabbix', 'Cloud Monitoring', 'Python', 'Runbooks', 'Confluence', 'AI agents'],
      projects: ['ai-production-support', 'unified-monitoring', 'media-monitoring', 'zabbix-upgrade']
    }
  ],

  /* ---------------------------------------------------------------------------
     7. SKILLS — grouped
     ---------------------------------------------------------------------------
     Each group becomes a filter chip. Items are plain strings. To highlight a
     skill for a role, put the exact same text in that role's `focus` list.     */
  skills: [
    { group: 'Cloud Platforms', items: ['GCP', 'Azure', 'AWS', 'IBM Cloud', 'ECS', 'FinOps'] },
    { group: 'GCP & Azure Services', items: ['Cloud Run', 'Cloud Tasks', 'Pub/Sub', 'BigQuery', 'Vertex AI', 'IAM', 'Secret Manager', 'IAP',
                                          'Azure VMs', 'Azure Storage', 'App Services', 'Application Insights'] },
    { group: 'Monitoring & Observability', items: ['Zabbix', 'Cloud Monitoring', 'Azure Monitor', 'Grafana', 'Prometheus / PromQL', 'MQL', 'ELK', 'Splunk', 'BetterStack',
                                                 'Uptime & synthetic monitoring'] },
    { group: 'Incident & Service Management', items: ['Opsgenie', 'incident.io', 'Jira / JSM', 'Confluence', 'ITIL (incident / problem / change)',
                                                     'SLO / SLA / error budgets', 'RCA', 'Runbooks'] },
    { group: 'Automation & DevOps', items: ['Python', 'Bash', 'Google Apps Script', 'REST APIs', 'Terraform', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Git / GitHub'] },
    { group: 'Identity & Access', items: ['Okta / Google SSO', 'AppGate', 'OpenVPN', 'LastPass', 'GitHub IAM & Teams', 'Access governance', 'Google Workspace admin'] },
    { group: 'AI & Data', items: ['Vertex AI Gemini', 'AI agents', 'LLMs', 'RAG concepts', 'Machine learning', 'SQL', 'IBM Cloud Pak for Data', 'IBM Watson',
                                 'IBM WebSphere (familiarity)'] },
    { group: 'Business & Media Platforms', items: ['Brightcove', 'uCMS', 'Bl.ink', 'Chartbeat', 'GA4', 'Amplitude', 'Apple News Publisher', 'YouTube Studio',
                                                 'DataMinr', 'MASV', 'Freestar', 'Taboola'] }
  ],

  /* ---------------------------------------------------------------------------
     8. EXPERIENCE — newest first. Each entry is one block on the timeline.
     ---------------------------------------------------------------------------
     To ADD a job: copy a whole { ... }, block, paste it where it belongs, edit.
     To REMOVE a job: delete its whole { ... }, block.
     company / title / period / place (optional) / note (optional italic line) /
     bullets (list) / tags (small chips).                                       */
  experience: [
    {
      company: 'Al Jazeera Media Network',
      title: 'Senior Service Engineer – Cloud & Operations (SE Ops)',
      period: 'Jul 2024 – Nov 2026',
      place: 'Remote',
      note: 'Role ended in late 2026 due to organisational restructuring.',
      bullets: [
        'Architected, and built with my team, an in-house unified monitoring platform: infrastructure, browser-journey and synthetic monitors in one place, with hub-and-spoke infrastructure monitoring on GCP.',
        'Designed an event-driven alert pipeline (Cloud Run, Pub/Sub, Cloud Tasks) with Vertex AI Gemini agents and Jira approval gates before Opsgenie paging.',
        'Migrated Azure Application Insights classic web tests to GCP Cloud Monitoring uptime checks with custom Google Apps Script automation, after comparing costs.',
        'Upgraded enterprise Zabbix from v5.0 to v8.x through multi-hop DB schema upgrades across global proxy nodes in Doha, London and Washington DC.',
        'Monitored digital publishing, live HLS streams, Apple News feeds, Text-to-Speech, QE test frameworks and AdTech (Freestar, Taboola).',
        'Ran quarterly cloud lifecycle assessments and FinOps reviews; managed incidents and RCAs in Opsgenie, incident.io and JSM; defined and reported SLOs and SLAs.',
        'Led identity governance and periodic security audits, enforced SSO, and acted as the operational bridge for uCMS and Brightcove.'
      ],
      tags: ['GCP', 'Azure', 'Zabbix', 'Vertex AI', 'Opsgenie', 'Python', 'Apps Script']
    },
    {
      company: 'L&T Infotech (LTIMindtree)',
      title: 'Data Scientist – AI Platforms & Production Support',
      period: 'Jul 2021 – Jul 2024',
      place: '',
      note: '',
      bullets: [
        'Led the production support team for AI bots and AI applications used by global banking clients: triage, escalation, SLA and RCA.',
        'Wrote Python automations for incident and access management.',
        'Supported cloud-based banking AI solutions, including banking change control and audits.'
      ],
      tags: ['Production support', 'AI bots', 'Python', 'Banking', 'RCA']
    },
    {
      company: 'JEA Digital Infosystems',
      title: 'Data Scientist – IBM Cloud Pak for Data & IBM Watson',
      period: 'Apr 2020 – Jul 2021',
      place: '',
      note: '',
      bullets: [
        'Built ML proofs of concept on IBM Cloud Pak for Data on Red Hat OpenShift: Watson Studio, Watson Machine Learning and Watson Knowledge Catalog.',
        'Integrated Watson Assistant, Watson Discovery and Watson NLU through REST APIs.',
        'Delivered dashboards and POCs on IBM Cloud. IBM WebSphere: working familiarity.'
      ],
      tags: ['IBM Cloud', 'Watson', 'OpenShift', 'Machine learning']
    },
    {
      company: 'HermitCrabs Technologies',
      title: 'Data Scientist',
      period: 'Sep 2018 – Mar 2020',
      place: '',
      note: '',
      bullets: [
        'Built analytics solutions and model-driven business forecasts using regression and time-series methods.',
        'Used Python and SQL, with automated reports and dashboards.'
      ],
      tags: ['Python', 'SQL', 'Forecasting', 'Dashboards']
    },
    {
      company: 'Accenture Solutions Pvt. Ltd.',
      title: 'Process Analyst – Healthcare',
      period: 'Sep 2015 – Aug 2018',
      place: '',
      note: '',
      bullets: [
        'Handled data operations and regulatory reporting for large-scale healthcare projects.',
        'Owned SLA, quality and compliance targets; wrote SOPs and mentored teammates.'
      ],
      tags: ['Data operations', 'Compliance', 'SOPs', 'Mentoring']
    }
  ],

  /* ---------------------------------------------------------------------------
     9. PROJECTS / CASE STUDIES — each opens in a pop-up window
     ---------------------------------------------------------------------------
     id       unique, no spaces (roles[].projects refers to it)
     title    card title             kicker   small label above the title
     summary  2-line card text       roles    role ids this belongs to (optional)
     problem  string                 did      list of bullets
     flow     list of steps for the architecture diagram ([] to hide it)
     flowNote optional line under the diagram
     stack    list of chips          outcome  QUALITATIVE only — no invented numbers.
     To ADD a project: copy a whole { ... }, block, paste, change the id.        */
  projects: [
    {
      id: 'unified-monitoring',
      kicker: 'Al Jazeera · Architecture & build',
      title: 'Unified Monitoring Platform with AI-Assisted Triage',
      summary: 'An in-house platform, architected and built with my team, that unifies infrastructure, browser-journey and synthetic monitoring, with event-driven alerting and human-approved AI.',
      problem: 'The team needed infrastructure, browser-journey and synthetic monitoring in one place, with alerts that arrive with context and a safe way to use AI in the incident flow.',
      did: [
        'Architected the platform and built it with my team, bringing infrastructure monitors, browser-journey monitors and synthetic monitors into one place.',
        'Deployed infrastructure monitoring on GCP in a hub-and-spoke model: a central hub project hosts the platform, and spokes are the monitored projects and environments.',
        'Designed the event-driven pipeline: ingestion on Cloud Run, Pub/Sub for decoupling, normalise, dedupe and correlate, then rate-limited calls via Cloud Tasks.',
        'Added Vertex AI Gemini agents that enrich alerts, summarise impact and probable cause, and recommend next steps, with JSON-schema-validated output and redaction.',
        'Treated logs as untrusted input (prompt-injection defence), added fallback to normal paging on timeout, and allowed remediation only after Jira approval.'
      ],
      flow: ['Monitored projects (spokes)', 'Cloud Run ingestion', 'Pub/Sub', 'Normalise · dedupe · correlate', 'Cloud Tasks (rate-limited)',
             'Vertex AI Gemini agents', 'Jira approval gate (human-in-the-loop)', 'Opsgenie paging'],
      flowNote: 'If the AI step times out, alerts fall back to normal paging. Remediation never runs without a Jira approval.',
      stack: ['GCP', 'Cloud Run', 'Pub/Sub', 'Cloud Tasks', 'Vertex AI Gemini', 'Jira', 'Opsgenie'],
      outcome: 'One consolidated place to see infrastructure, journey and synthetic health, and alerts that arrive enriched with impact, probable cause and suggested next steps. Humans stay in control of every remediation. [your number: e.g. reduction in alert noise or triage time]',
      roles: ['sre', 'cloudops', 'devops', 'service', 'prodsupport']
    },
    {
      id: 'azure-gcp-migration',
      kicker: 'Al Jazeera · Migration automation',
      title: 'Azure → GCP Uptime Monitoring Migration',
      summary: 'Microsoft retired Application Insights classic URL-ping tests. I compared costs and migrated them to GCP uptime checks with custom Apps Script automation.',
      problem: 'Microsoft retired Azure Application Insights classic (URL ping) web tests and recommended standard tests. Every affected test needed a replacement without losing coverage or ownership.',
      did: [
        'Compared the cost of the options; GCP Cloud Monitoring uptime checks came out most cost-effective.',
        'Built Google Apps Script automation: UrlFetchApp calls to the Azure Resource Manager REST API (Microsoft.Insights/webtests) using an Entra ID service principal OAuth token; XmlService to parse the classic WebTest XML.',
        'Used a Google Sheet (SpreadsheetApp) as inventory and for owner review before anything was created.',
        'Created uptime checks, alert policies and notification channels through the Cloud Monitoring API v3, with ScriptApp OAuth tokens and the OAuth2 library.',
        'Protected secrets with PropertiesService, avoided double runs with LockService, used time-driven triggers, and batched work to stay within the 6-minute execution limit.',
        'Ran old and new in parallel, reconciled the results, cut over, then decommissioned the Azure tests.'
      ],
      flow: ['Azure Resource Manager API', 'Parse classic WebTest XML', 'Google Sheet inventory + owner review', 'Cloud Monitoring API v3',
             'Uptime checks + alert policies + channels', 'Parallel run & reconcile', 'Cut over & decommission'],
      flowNote: '',
      stack: ['Google Apps Script', 'Azure Resource Manager', 'Entra ID', 'Application Insights', 'Cloud Monitoring API v3', 'Google Sheets', 'OAuth2'],
      outcome: 'A cost-justified, repeatable migration with clear owner sign-off, a safe parallel run, and no loss of monitoring coverage when the classic tests were retired.',
      roles: ['cloudops', 'devops', 'sre', 'cloudsupport', 'ops']
    },
    {
      id: 'zabbix-upgrade',
      kicker: 'Al Jazeera · Platform upgrade',
      title: 'Zabbix 5.0 → 8.x Multi-Hop Upgrade',
      summary: 'Upgraded enterprise Zabbix across distributed global proxy nodes in Doha, London and Washington DC, with backups, rehearsal and a rollback plan.',
      problem: 'Enterprise Zabbix v5.0 needed to reach v8.x. The database schema cannot jump straight across, and distributed proxy nodes in three regions had to stay consistent.',
      did: [
        'Planned the multi-hop path through 6.0 and 7.0 to 8.x, including the DB schema upgrade at each hop.',
        'Took backups before every step and rehearsed the entire sequence on a clone first.',
        'Prepared and documented a rollback plan before touching production.',
        'Upgraded the distributed proxy nodes in Doha, London and Washington DC and verified collection end to end.'
      ],
      flow: ['Backup', 'Rehearse on clone', '5.0 → 6.0', '6.0 → 7.0', '7.0 → 8.x', 'Upgrade proxies (Doha · London · Washington DC)', 'Verify'],
      flowNote: 'Rollback plan agreed before the production run.',
      stack: ['Zabbix', 'Database schema upgrades', 'Distributed proxies', 'Backups & rollback'],
      outcome: 'Monitoring moved to a current supported release with no surprises: rehearsed on a clone, backed up at each hop, and consistent across all three regions.',
      roles: ['sre', 'cloudops', 'prodsupport', 'devops']
    },
    {
      id: 'media-monitoring',
      kicker: 'Al Jazeera · Service monitoring',
      title: 'Media & Digital Publishing Service Monitoring',
      summary: 'Health checks, uptime monitors and alert policies for publishing, live streams, feeds and ad platforms, tuned for breaking news and major live events.',
      problem: 'A digital newsroom depends on many moving parts (publishing, live video, feeds, speech, ads), and breaking news or major sporting events put them all under load at once.',
      did: [
        'Built health checks, uptime monitors and alert policies for digital publishing services.',
        'Covered AJ World HLS live streams, Apple News feeds and Text-to-Speech (Listen to Article).',
        'Monitored QE test frameworks and AdTech integrations (Freestar, Taboola).',
        'Managed incidents with Opsgenie, incident.io and Jira Service Management, followed by RCA, and defined and reported SLOs and SLAs.',
        'Supported high-traffic editorial deployments, breaking news and major sporting events.'
      ],
      flow: ['Health checks & uptime monitors', 'Alert policies', 'Opsgenie / incident.io', 'JSM tracking', 'RCA & SLO/SLA reporting'],
      flowNote: '',
      stack: ['Cloud Monitoring', 'Opsgenie', 'incident.io', 'Jira Service Management', 'Splunk', 'HLS', 'Apple News'],
      outcome: 'Faster, better-informed responses when audiences matter most, plus a consistent incident-to-RCA loop and SLO/SLA reporting that stakeholders could rely on.',
      roles: ['service', 'sre', 'prodsupport', 'cloudsupport', 'techsupport', 'ops']
    },
    {
      id: 'identity-governance',
      kicker: 'Al Jazeera · Security & operations',
      title: 'Identity & Access Governance',
      summary: 'Periodic access audits, mandatory SSO and retirement of shared accounts across the newsroom tool estate.',
      problem: 'Access across the newsroom and engineering tool estate needed governance: shared accounts, consistent sign-in and clear ownership.',
      did: [
        'Ran access governance and periodic security audits across GitHub, Chartbeat, GA4, Amplitude, LastPass, Bl.ink and OpenVPN.',
        'Drove mandatory corporate SSO (Okta / Google) and deprecated shared accounts.',
        'Owned onboarding and offboarding processes.',
        'Provided Google Workspace admin support.'
      ],
      flow: ['Inventory', 'Audit', 'Enforce SSO', 'Retire shared accounts', 'On/offboarding checks'],
      flowNote: '',
      stack: ['Okta', 'Google SSO', 'GitHub IAM & Teams', 'LastPass', 'OpenVPN', 'AppGate', 'Google Workspace'],
      outcome: 'Named individual access via corporate SSO, a repeatable audit rhythm, and a cleaner offboarding trail, so access follows people rather than shared logins.',
      roles: ['ops', 'cloudsupport', 'service', 'techsupport', 'cloudops']
    },
    {
      id: 'business-ops',
      kicker: 'Al Jazeera · Business tools as services',
      title: 'uCMS, Brightcove & Short-URL Operations',
      summary: 'Operational bridge for the Universal CMS and Brightcove Video Cloud, plus zero-downtime short-URL domain migrations.',
      problem: 'Editorial teams rely on the CMS, the video platform and branded short links. Legacy API clients, editorial permissions and domain changes all needed careful handling.',
      did: [
        'Acted as operational bridge for Universal CMS (uCMS) and Brightcove Video Cloud.',
        'Purged 200+ legacy Brightcove API clients and defined least-privilege editorial role groups.',
        'Migrated short-URL domains with zero downtime: aja.me → aja.ws and aje.io → aje.news, using Bl.ink, DNS, TLS, 301 redirects and low TTLs.',
        'Handled Meta/Facebook user-data deletion compliance requests, and digital forensics on brand-infringement domains (WHOIS/RDAP, DNS, hosting, certificate transparency).'
      ],
      flow: ['Lower DNS TTL', 'Bl.ink + TLS ready', '301 redirects', 'Cut DNS', 'Verify & monitor'],
      flowNote: 'Pattern used for both domain migrations.',
      stack: ['Brightcove', 'uCMS', 'Bl.ink', 'DNS', 'TLS', 'WHOIS / RDAP', 'Certificate transparency'],
      outcome: 'A cleaner video platform, editors with only the access they need, and short-link domains that moved without readers noticing.',
      roles: ['service', 'ops', 'techsupport']
    },
    {
      id: 'ai-production-support',
      kicker: 'L&T Infotech (LTIMindtree) · Production support',
      title: 'Production Support for Banking AI Applications',
      summary: 'Led the production support team for AI bots and applications serving global banking clients, with triage, escalation, SLA and RCA.',
      problem: 'AI bots and applications used by global banking clients needed dependable support: fast triage, clear escalation and disciplined change control.',
      did: [
        'Led the production support team: triage, escalation, SLA tracking and RCA.',
        'Wrote Python automations for incident and access management.',
        'Supported cloud-based banking AI solutions and followed banking change control and audits.'
      ],
      flow: ['Alert / ticket', 'Triage', 'Escalate', 'Resolve', 'RCA & change control'],
      flowNote: '',
      stack: ['Python', 'Production support', 'Cloud-hosted AI solutions', 'Change control'],
      outcome: 'Reliable, audit-ready support for AI services in a regulated environment, with automation taking the repetitive incident and access work off the team.',
      roles: ['prodsupport', 'techsupport', 'cloudsupport']
    },
    {
      id: 'ibm-watson-pocs',
      kicker: 'JEA Digital Infosystems · Proofs of concept',
      title: 'IBM Cloud Pak for Data & Watson POCs',
      summary: 'ML proofs of concept on Cloud Pak for Data (Red Hat OpenShift), with Watson services integrated through REST APIs.',
      problem: 'Stakeholders needed working proofs of concept for ML and conversational AI on IBM Cloud.',
      did: [
        'Built ML POCs on IBM Cloud Pak for Data on Red Hat OpenShift using Watson Studio, Watson Machine Learning and Watson Knowledge Catalog.',
        'Integrated Watson Assistant, Watson Discovery and Watson NLU through REST APIs.',
        'Built dashboards and POCs on IBM Cloud.'
      ],
      flow: ['Data & catalog', 'Watson Studio', 'Watson Machine Learning', 'REST APIs', 'Dashboards'],
      flowNote: '',
      stack: ['IBM Cloud Pak for Data', 'Red Hat OpenShift', 'Watson Studio', 'Watson ML', 'Watson Assistant', 'Watson Discovery', 'Watson NLU'],
      outcome: 'Working demonstrations that let stakeholders evaluate ML and Watson capabilities on IBM Cloud, and hands-on experience with Red Hat OpenShift-based platforms.',
      roles: ['devops', 'cloudops']
    }
  ],

  /* ---------------------------------------------------------------------------
     10. ACHIEVEMENTS / HIGHLIGHTS — each is one card.  `icon` is a short glyph.
     --------------------------------------------------------------------------- */
  achievements: [
    { icon: '✦', title: 'Architected an in-house unified monitoring platform',
      text: 'Led the architecture and built it with my team, and put human-approved AI agents inside the alert flow.' },
    { icon: '⇄', title: 'Cost-led cloud migration',
      text: 'Compared the options, picked the cheapest viable one (GCP uptime checks), and migrated Azure classic web tests with custom automation.' },
    { icon: '↑', title: 'Zabbix 5.0 → 8.x, three regions',
      text: 'Multi-hop upgrade with backups, a rehearsal on a clone and a rollback plan across Doha, London and Washington DC proxies.' },
    { icon: '⌫', title: 'Purged 200+ legacy Brightcove API clients',
      text: 'Cleaned up the video platform and introduced least-privilege editorial role groups.' },
    { icon: '↪', title: 'Zero-downtime short-URL migrations',
      text: 'aja.me → aja.ws and aje.io → aje.news with low TTLs, TLS and 301 redirects.' },
    { icon: '⚑', title: 'Mandatory SSO & access audits',
      text: 'Corporate SSO enforced, shared accounts deprecated, periodic audits across the tool estate.' },
    { icon: '☰', title: 'Led banking AI production support',
      text: 'Led the support team behind AI bots and applications for global banking clients.' },
    { icon: '⌕', title: 'Compliance & digital forensics',
      text: 'Meta/Facebook data-deletion requests, and investigations into brand-infringement domains using WHOIS/RDAP, DNS and certificate transparency.' }
  ],

  /* ---------------------------------------------------------------------------
     11. EDUCATION
     --------------------------------------------------------------------------- */
  education: [
    { degree: 'B.Pharm', school: 'Nirmala College of Pharmacy', year: '2015', detail: '70%' }
  ],

  /* ---------------------------------------------------------------------------
     12. CV DOWNLOADS
     ---------------------------------------------------------------------------
     Put the PDF files in the /cv folder using exactly these file names (or edit
     the names here). `role` links the CV to the role switcher.                 */
  cv: [
    { role: 'cloudops', label: 'Cloud Operations & Site Reliability Engineer', file: 'cv/Shaik_Moin_CV_Cloud_Operations_SRE.pdf' }
  ]
};
