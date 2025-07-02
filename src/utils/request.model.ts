export class RequestModel<T> {
  userId?: string;
  data?: T;
  createdAt: Date;

  private constructor(input: { userId?: string; data?: T; createdAt?: Date }) {
    this.userId = input.userId;
    this.data = input.data;
    this.createdAt = input.createdAt ?? new Date();
  }

  static from<T>(input: {
    userId?: string;
    data?: T;
    createdAt?: Date;
  }): RequestModel<T> {
    return new RequestModel(input);
  }
}
