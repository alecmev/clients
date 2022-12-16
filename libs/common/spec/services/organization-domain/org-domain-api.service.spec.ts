import { mock, mockReset } from "jest-mock-extended";
import { lastValueFrom } from "rxjs";

import { ApiService } from "@bitwarden/common/abstractions/api.service";
import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { OrganizationDomainResponse } from "@bitwarden/common/abstractions/organization-domain/responses/organization-domain.response";
import { PlatformUtilsService } from "@bitwarden/common/abstractions/platformUtils.service";
import { OrgDomainApiService } from "@bitwarden/common/services/organization-domain/org-domain-api.service";
import { OrgDomainService } from "@bitwarden/common/services/organization-domain/org-domain.service";

const mockedGetAllByOrgIdResponse: any = {
  data: [
    {
      id: "ca01a674-7f2f-45f2-8245-af6d016416b7",
      organizationId: "cb903acf-2361-4072-ae32-af6c014943b6",
      txt: "bw=EUX6UKR8A68igAJkmodwkzMiqB00u7Iyq1QqALu6jFID",
      domainName: "test.com",
      creationDate: "2022-12-16T21:36:28.68Z",
      nextRunDate: "2022-12-17T09:36:28.68Z",
      jobRunCount: 0,
      verifiedDate: null as any,
      lastCheckedDate: "2022-12-16T21:36:28.7633333Z",
      object: "organizationDomain",
    },
    {
      id: "adbd44c5-90d5-4537-97e6-af6d01644870",
      organizationId: "cb903acf-2361-4072-ae32-af6c014943b6",
      txt: "bw=Ql4fCfDacmcjwyAP9BPmvhSMTCz4PkEDm4uQ3fH01pD4",
      domainName: "test2.com",
      creationDate: "2022-12-16T21:37:10.9566667Z",
      nextRunDate: "2022-12-17T09:37:10.9566667Z",
      jobRunCount: 0,
      verifiedDate: "totally verified",
      lastCheckedDate: "2022-12-16T21:37:11.1933333Z",
      object: "organizationDomain",
    },
    {
      id: "05cf3ab8-bcfe-4b95-92e8-af6d01680942",
      organizationId: "cb903acf-2361-4072-ae32-af6c014943b6",
      txt: "bw=EQNUs77BWQHbfSiyc/9nT3wCen9z2yMn/ABCz0cNKaTx",
      domainName: "test3.com",
      creationDate: "2022-12-16T21:50:50.96Z",
      nextRunDate: "2022-12-17T09:50:50.96Z",
      jobRunCount: 0,
      verifiedDate: null,
      lastCheckedDate: "2022-12-16T21:50:51.0933333Z",
      object: "organizationDomain",
    },
  ],
  continuationToken: null as any,
  object: "list",
};

const mockedOrgDomainServerResponse = {
  id: "ca01a674-7f2f-45f2-8245-af6d016416b7",
  organizationId: "cb903acf-2361-4072-ae32-af6c014943b6",
  txt: "bw=EUX6UKR8A68igAJkmodwkzMiqB00u7Iyq1QqALu6jFID",
  domainName: "test.com",
  creationDate: "2022-12-16T21:36:28.68Z",
  nextRunDate: "2022-12-17T09:36:28.68Z",
  jobRunCount: 0,
  verifiedDate: null as any,
  lastCheckedDate: "2022-12-16T21:36:28.7633333Z",
  object: "organizationDomain",
};

const mockedOrgDomainResponse = new OrganizationDomainResponse(mockedOrgDomainServerResponse);

describe("Org Domain API Service", () => {
  let orgDomainApiService: OrgDomainApiService;

  const apiService = mock<ApiService>();

  let orgDomainService: OrgDomainService;

  const platformUtilService = mock<PlatformUtilsService>();
  const i18nService = mock<I18nService>();

  beforeEach(() => {
    orgDomainService = new OrgDomainService(platformUtilService, i18nService);
    mockReset(apiService);

    orgDomainApiService = new OrgDomainApiService(orgDomainService, apiService);
  });

  it("instantiates", () => {
    expect(orgDomainApiService).not.toBeFalsy();
  });

  it("getAllByOrgId", () => {
    apiService.send.mockResolvedValue(mockedGetAllByOrgIdResponse);

    expect(lastValueFrom(orgDomainService.orgDomains$)).resolves.toHaveLength(0);

    const orgDomainSvcReplaceSpy = jest.spyOn(orgDomainService, "replace");

    orgDomainApiService
      .getAllByOrgId("fakeOrgId")
      .then((orgDomainResponses: Array<OrganizationDomainResponse>) => {
        expect(orgDomainResponses).toHaveLength(3);

        expect(orgDomainSvcReplaceSpy).toHaveBeenCalled();
        expect(lastValueFrom(orgDomainService.orgDomains$)).resolves.toHaveLength(3);
      });
  });

  it("getByOrgIdAndOrgDomainId", () => {
    apiService.send.mockResolvedValue(mockedOrgDomainServerResponse);

    expect(lastValueFrom(orgDomainService.orgDomains$)).resolves.toHaveLength(0);

    const orgDomainSvcUpsertSpy = jest.spyOn(orgDomainService, "upsert");

    orgDomainApiService
      .getByOrgIdAndOrgDomainId("fakeOrgId", "fakeDomainId")
      .then((orgDomain: OrganizationDomainResponse) => {
        expect(orgDomain.id).toEqual(mockedOrgDomainServerResponse.id);

        expect(orgDomainSvcUpsertSpy).toHaveBeenCalled();
        expect(lastValueFrom(orgDomainService.orgDomains$)).resolves.toHaveLength(1);
      });
  });

  it("post", () => {
    apiService.send.mockResolvedValue(mockedOrgDomainServerResponse);

    expect(lastValueFrom(orgDomainService.orgDomains$)).resolves.toHaveLength(0);

    const orgDomainSvcUpsertSpy = jest.spyOn(orgDomainService, "upsert");

    orgDomainApiService
      .post("fakeOrgId", mockedOrgDomainResponse)
      .then((orgDomain: OrganizationDomainResponse) => {
        expect(orgDomain.id).toEqual(mockedOrgDomainServerResponse.id);

        expect(orgDomainSvcUpsertSpy).toHaveBeenCalled();
        expect(lastValueFrom(orgDomainService.orgDomains$)).resolves.toHaveLength(1);
      });
  });

  it("verify", () => {
    apiService.send.mockResolvedValue(mockedOrgDomainServerResponse);

    expect(lastValueFrom(orgDomainService.orgDomains$)).resolves.toHaveLength(0);

    const orgDomainSvcUpsertSpy = jest.spyOn(orgDomainService, "upsert");

    orgDomainApiService
      .verify("fakeOrgId", "fakeOrgId")
      .then((orgDomain: OrganizationDomainResponse) => {
        expect(orgDomain.id).toEqual(mockedOrgDomainServerResponse.id);

        expect(orgDomainSvcUpsertSpy).toHaveBeenCalled();
        expect(lastValueFrom(orgDomainService.orgDomains$)).resolves.toHaveLength(1);
      });
  });

  it("delete", () => {
    apiService.send.mockResolvedValue(true);
    orgDomainService.upsert([mockedOrgDomainResponse]);
    expect(lastValueFrom(orgDomainService.orgDomains$)).resolves.toHaveLength(1);

    const orgDomainSvcDeleteSpy = jest.spyOn(orgDomainService, "delete");

    orgDomainApiService.delete("fakeOrgId", "fakeOrgId").then(() => {
      expect(orgDomainSvcDeleteSpy).toHaveBeenCalled();
      expect(lastValueFrom(orgDomainService.orgDomains$)).resolves.toHaveLength(0);
    });
  });

  // TODO: add Get Domain SSO method: Retrieves SSO provider information given a domain name
  // when added on back end
});
