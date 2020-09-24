import { useCallback, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
import setWith from 'lodash/setWith'
import clone from 'lodash/clone'

export function setIn(obj, path, value) {
    return setWith(clone(obj), path, value, clone);
}

export const useCurrState = (state, comparePath = []) => {
    const ref = useRef(state);

    ref.current = comparePath.reduce((acc, path) => {
        const prev = get(ref.current, path);
        if (isEqual(prev, get(state, path))) {
            return setIn(acc, path, prev);
        }

        return acc;
    }, state);

    return useCallback(() => ref.current, []);
}