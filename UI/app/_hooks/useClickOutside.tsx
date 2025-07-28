import { useEffect } from "react";

export function useClickOutside(el: React.RefObject<HTMLElement | null>, onClickOutside: () => void) {

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!el.current?.contains(target)) {
                onClickOutside();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [el, onClickOutside]);

}