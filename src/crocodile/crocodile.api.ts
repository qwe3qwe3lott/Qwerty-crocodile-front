import { io, Socket } from 'socket.io-client';
import { User } from '@crocodile/crocodile.entity';

type ResponseData<TSuccess extends Record<string, unknown> = Record<string, unknown>, TError extends Record<string, unknown> = Record<string, unknown>> =
    ({ _status: 'OK' } & TSuccess)
    | ({ _status: 'ERROR' } & TError);

type ServerToClientEvents = {
	users: (users: User[]) => void
};

type ClientToServerEvents = {
	createRoom: (payload: null, cb: (response: ResponseData<{ roomId: string }>) => void) => void;
	joinRoom: (payload: { roomId: string, userId?: string, login: string }, cb: (response: ResponseData<{
		userId: string,
		users: User[]
	}>) => void) => void;
	leaveRoom: (payload: null, cb: (response: ResponseData) => void) => void
};

type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export const socket: ClientSocket = io('ws://localhost:3001/crocodile');
