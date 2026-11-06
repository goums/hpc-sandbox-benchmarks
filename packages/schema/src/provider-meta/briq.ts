import { defineProviderMeta } from "../provider-meta.ts";

export default defineProviderMeta("briq", {
	displayName: "briq",
	vendor: "briq",
	website: "https://briq.cloud",
	sdkPackage: "@briq-cloud/sdk",
	// Boots the shared public toolchain image straight from ghcr.io; nothing is baked.
	artifact: { kind: "image" },
	inputs: [
		"BRIQ_API_KEY",
		{ name: "BRIQ_API_URL", source: { kind: "variable" }, default: "https://api.briq.cloud" },
	],
	isolation: {
		class: "microVM",
		technology: "Firecracker microVM (one container image per sandbox)",
		notes:
			"Each sandbox runs one OCI image in its own microVM with its own guest kernel. The guest sees its own allocation: nproc and MemTotal match the size.",
	},
	pricing: {
		model: "unavailable",
		reason: "unpublished",
		notes:
			"Billed per second in euro cents at the size's rate while the sandbox runs; a sleeping sandbox is not billed for compute. The price list is revised and shown in the dashboard's display currency, so no rate is pinned here. Pin the 4 vCPU / 8 GiB size's rate from https://briq.cloud/pricing when the list is final.",
	},
	maturity: {
		status: "beta",
		notes:
			"Native SDK driver (@briq-cloud/sdk) for create, command execution, inventory, ambiguous-create recovery and convergent teardown. The credential must belong to a team used only for this benchmark: every sandbox in it is benchmark-owned. The 4 vCPU / 8 GiB target needs a size the key's policy allows; the root disk must be 40 GB or more, which the kit proves with df after boot.",
	},
	specPinning: "fixed",
	transport: {
		streaming: false,
		syncCapMs: 60_000,
		detachedPoll: true,
	},
});
