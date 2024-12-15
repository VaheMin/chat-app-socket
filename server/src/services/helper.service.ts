export class HelperService {
  static formatResponse(status: string, body: any) {
    return {
      status,
      body,
    };
  }
}
