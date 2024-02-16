export const throttle = <Arg extends unknown[], F extends (...arg: Arg) => unknown>(cb: F, duration: number) => {
	let shouldWait = false;

	return (...args: Arg) => {
		if (shouldWait) return;

		shouldWait = true;

		setTimeout(() => {
			cb(...args);
			shouldWait = false;
		}, duration);
	};
};

export const delay = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};