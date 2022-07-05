import {useCallback} from 'react';

const useToast = (msg) => {
	return useCallback((text) => {
		if (window.M && text) {
			window.M.toast({html:text})
		}
	}, [])
}

export default useToast