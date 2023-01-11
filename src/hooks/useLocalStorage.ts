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

	return [value, setValue] as const; // as const makes sure that this array is seen like tuple with given fixed types for 1st and 2nd element
};

export default useLocalStorage;
