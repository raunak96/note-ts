import { useEffect, useState } from "react";

const useLocalStorage = <T>(key: string, initialValue: T | (() => T)) => {
	const [value, setValue] = useState<T>(() => {
		const valueInStore = localStorage.getItem(key);
		if (valueInStore) return JSON.parse(valueInStore);
		if (initialValue instanceof Function) return initialValue();
		return initialValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue] as [T, typeof setValue];
};

export default useLocalStorage;
