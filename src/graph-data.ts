export type NodeKind = "github" | "huggingface" | "llm" | "storage" | "actor" | "group";

export type EdgeKind =
  | "creates"
  | "contains"
  | "configures"
  | "checks"
  | "provisions"
  | "stores"
  | "routes_to"
  | "logs_to"
  | "uses"
  | "connected_to";

export interface GraphNode {
  id: string;
  label: string;
  kind: NodeKind;
  parent?: string;
  url?: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  kind: EdgeKind;
  label: string;
}

export const nodes: GraphNode[] = [
  { id: "admin-setup", label: "Admin Flow", kind: "group" },
  { id: "participant-flow", label: "Participant Flow", kind: "group" },
  { id: "admin", label: "Admin", kind: "actor", parent: "admin-setup" },
  { id: "participant", label: "Participant", kind: "actor", parent: "participant-flow" },
  {
    id: "iss-org",
    label: "ISS Workshop Org",
    kind: "github",
    parent: "admin-setup",
    url: "https://github.com/schmidt-sciences",
  },
  {
    id: "iss-repo",
    label: "ISS Workshop Repo",
    kind: "github",
    parent: "admin-setup",
    url: "https://github.com/schmidt-sciences/viss-agentic-ai-workshop-iss-2026",
  },
  {
    id: "iss-team",
    label: "ISS GitHub Team",
    kind: "github",
    parent: "admin-setup",
    url: "https://github.com/orgs/schmidt-sciences/teams/2026-viss-ai-workshop-participants",
  },
  {
    id: "iss-onboard-public",
    label: "ISS Onboarding Service Public",
    kind: "huggingface",
    parent: "admin-setup",
    url: "https://uw-ssec-onboard-service-iss.hf.space/",
  },
  {
    id: "iss-onboard-management",
    label: "ISS Onboarding Service Management",
    kind: "huggingface",
    parent: "admin-setup",
    url: "https://huggingface.co/spaces/uw-ssec/onboard-service-iss",
  },
  {
    id: "june-org",
    label: "June 17 Workshop Org",
    kind: "github",
    parent: "admin-setup",
    url: "https://github.com/uw-ssec-workshops",
  },
  {
    id: "june-repo",
    label: "June 17 Workshop Repo",
    kind: "github",
    parent: "admin-setup",
    url: "https://github.com/uw-ssec-workshops/coding-with-agents-workshop",
  },
  {
    id: "june-team",
    label: "June 17 GitHub Team",
    kind: "github",
    parent: "admin-setup",
    url: "https://github.com/orgs/uw-ssec-workshops/teams/coding-agent-workshop",
  },
  {
    id: "june-onboard-public",
    label: "June 17 Onboarding Service Public",
    kind: "huggingface",
    parent: "admin-setup",
    url: "https://uw-ssec-onboard-service-iss-dryrun.hf.space/",
  },
  {
    id: "june-onboard-management",
    label: "June 17 Onboarding Service Management",
    kind: "huggingface",
    parent: "admin-setup",
    url: "https://huggingface.co/spaces/uw-ssec/onboard-service-iss-dryrun",
  },
  {
    id: "uw-fork-org",
    label: "UW-SSEC Working Fork Org",
    kind: "github",
    parent: "admin-setup",
    url: "https://github.com/uw-ssec/",
  },
  {
    id: "uw-fork-repo",
    label: "UW-SSEC Workshop Forking Repo",
    kind: "github",
    parent: "admin-setup",
    url: "https://github.com/uw-ssec/viss-agentic-ai-workshop-iss-2026",
  },
  {
    id: "litellm-gateway",
    label: "LiteLLM Gateway",
    kind: "llm",
    url: "https://llmaven-iss-prod-litellm-prod.gentlebay-de6eef95.westus2.azurecontainerapps.io/",
  },
  {
    id: "azure-foundry",
    label: "Azure Foundry",
    kind: "llm",
    url: "https://ai.azure.com/foundryProject/overview?wsid=/subscriptions/d96a6573-baaf-43fd-873e-bb885bf3f437/resourceGroups/rg-llmaven-iss-westus2/providers/Microsoft.CognitiveServices/accounts/carlo-mpyc8w29-eastus2/projects/carlo-mpyc8w29-eastus2_project&tid=f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
  },
  { id: "aws-bedrock", label: "AWS Bedrock", kind: "llm" },
  { id: "logs-db", label: "Logs Database", kind: "storage" },
  {
    id: "codespaces",
    label: "Codespaces",
    kind: "github",
    parent: "participant-flow",
    url: "https://github.com/codespaces",
  },
  {
    id: "codespace-secrets",
    label: "Codespace Secrets\n\nLiteLLM URL\nUser LiteLLM API Key",
    kind: "github",
    parent: "codespaces",
    url: "https://github.com/settings/codespaces",
  },
];

export const edges: GraphEdge[] = [
  { id: "admin-creates-iss-org", source: "admin", target: "iss-org", kind: "creates", label: "creates" },
  { id: "iss-org-contains-repo", source: "iss-org", target: "iss-repo", kind: "contains", label: "contains" },
  { id: "iss-org-contains-team", source: "iss-org", target: "iss-team", kind: "contains", label: "contains" },
  { id: "admin-creates-iss-service", source: "admin", target: "iss-onboard-management", kind: "creates", label: "creates" },
  { id: "iss-management-runs-public", source: "iss-onboard-management", target: "iss-onboard-public", kind: "connected_to", label: "manages" },
  { id: "iss-service-checks-team", source: "iss-onboard-public", target: "iss-team", kind: "checks", label: "checks" },
  { id: "iss-service-configures-litellm", source: "iss-onboard-public", target: "litellm-gateway", kind: "configures", label: "configures" },
  { id: "admin-creates-june-org", source: "admin", target: "june-org", kind: "creates", label: "creates" },
  { id: "june-org-contains-repo", source: "june-org", target: "june-repo", kind: "contains", label: "contains" },
  { id: "june-org-contains-team", source: "june-org", target: "june-team", kind: "contains", label: "contains" },
  { id: "admin-creates-june-service", source: "admin", target: "june-onboard-management", kind: "creates", label: "creates" },
  { id: "june-management-runs-public", source: "june-onboard-management", target: "june-onboard-public", kind: "connected_to", label: "manages" },
  { id: "june-service-checks-team", source: "june-onboard-public", target: "june-team", kind: "checks", label: "checks" },
  { id: "june-service-configures-litellm", source: "june-onboard-public", target: "litellm-gateway", kind: "configures", label: "configures" },
  { id: "uw-org-contains-fork", source: "uw-fork-org", target: "uw-fork-repo", kind: "contains", label: "contains" },
  { id: "uw-org-to-iss-repo", source: "uw-fork-org", target: "iss-repo", kind: "connected_to", label: "working org" },
  { id: "iss-repo-forked-from-uw", source: "uw-fork-repo", target: "iss-repo", kind: "connected_to", label: "work of UW-SSEC repo" },
  { id: "june-repo-derived-from-uw", source: "uw-fork-repo", target: "june-repo", kind: "connected_to", label: "work of UW-SSEC repo" },
  { id: "litellm-to-azure", source: "litellm-gateway", target: "azure-foundry", kind: "routes_to", label: "routes_to" },
  { id: "litellm-to-aws", source: "litellm-gateway", target: "aws-bedrock", kind: "routes_to", label: "routes_to" },
  { id: "litellm-to-logs", source: "litellm-gateway", target: "logs-db", kind: "logs_to", label: "logs_to" },
  { id: "participant-uses-iss-service", source: "participant", target: "iss-onboard-public", kind: "uses", label: "uses" },
  { id: "participant-uses-june-service", source: "participant", target: "june-onboard-public", kind: "uses", label: "uses" },
  { id: "participant-uses-codespaces", source: "participant", target: "codespaces", kind: "uses", label: "uses" },
  { id: "iss-service-provisions-codespace", source: "iss-onboard-public", target: "codespaces", kind: "provisions", label: "provisions" },
  { id: "june-service-provisions-codespace", source: "june-onboard-public", target: "codespaces", kind: "provisions", label: "provisions" },
  {
    id: "secrets-store-litellm-config",
    source: "codespace-secrets",
    target: "litellm-gateway",
    kind: "stores",
    label: "stores LiteLLM URL + user API key",
  },
];

export const positions: Record<string, { x: number; y: number }> = {
  admin: { x: 80, y: 150 },
  "iss-org": { x: 330, y: 80 },
  "iss-repo": { x: 650, y: 35 },
  "iss-team": { x: 650, y: 205 },
  "iss-onboard-management": { x: 1000, y: 80 },
  "iss-onboard-public": { x: 1300, y: 160 },
  "june-org": { x: 330, y: 485 },
  "june-repo": { x: 650, y: 410 },
  "june-team": { x: 650, y: 590 },
  "june-onboard-management": { x: 1000, y: 485 },
  "june-onboard-public": { x: 1300, y: 575 },
  "uw-fork-org": { x: 300, y: 865 },
  "uw-fork-repo": { x: 700, y: 865 },
  "litellm-gateway": { x: 1575, y: 360 },
  "azure-foundry": { x: 1840, y: 120 },
  "aws-bedrock": { x: 1840, y: 360 },
  "logs-db": { x: 1840, y: 640 },
  participant: { x: 80, y: 1280 },
  codespaces: { x: 820, y: 1240 },
  "codespace-secrets": { x: 820, y: 1300 },
};
