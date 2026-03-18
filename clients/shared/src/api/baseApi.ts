export class BaseApi {
  protected base: string;

  constructor(baseUrl: string) {
    this.base = baseUrl.replace(/\/$/, "");
  }

  protected queryToSearchParams(query: object) {
    const searchParams = new URLSearchParams(
      Object.entries(query)
        .filter(([, v]) => v !== undefined && v !== null)
        .map(([k, v]) => [k, String(v)])
    );

    return searchParams.toString();
  }
}
