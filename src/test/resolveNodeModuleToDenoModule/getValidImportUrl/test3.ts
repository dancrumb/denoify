import { ModuleAddress } from "../../../lib/types/ModuleAddress";
import { assert } from "tsafe";
import { getValidImportUrlFactory } from "../../../lib/resolveNodeModuleToDenoModule";

(async () => {
    const moduleAddress: ModuleAddress.GitHubRepo = {
        "type": "GITHUB REPO",
        "userOrOrg": "garronej",
        "repositoryName": "ts-md5",
        "branch": undefined
    } as const;

    {
        const getValidImportUrlFactoryResult = await getValidImportUrlFactory({
            "moduleAddress": moduleAddress,
            "desc": "MATCH VERSION INSTALLED IN NODE_MODULE",
            "version": "1.2.7"
        });

        assert(getValidImportUrlFactoryResult.couldConnect === true);

        const { versionFallbackWarning, getValidImportUrl } = getValidImportUrlFactoryResult;

        assert(typeof versionFallbackWarning === "undefined");

        assert(
            (await getValidImportUrl({ "target": "DEFAULT EXPORT" })) === "https://raw.githubusercontent.com/garronej/ts-md5/v1.2.7/deno_dist/mod.ts"
        );

        assert(
            (await getValidImportUrl({ "target": "SPECIFIC FILE", "specificImportPath": "dist/parallel_hasher" })) ===
                "https://raw.githubusercontent.com/garronej/ts-md5/v1.2.7/deno_dist/parallel_hasher.ts"
        );
    }

    console.log("PASS");
})();
