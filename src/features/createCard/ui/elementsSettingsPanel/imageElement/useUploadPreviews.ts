import {useCallback, useEffect, useState} from "react";

export interface Preview {
    url: string;
    status: "uploading" | "done" | "error";
    showStatusIcon: boolean;
}

export const useUploadPreviews = (
    onUploadSuccess: (urls: string[]) => void,
    initialUrls: string[] = []
) => {
    const [previews, setPreviews] = useState<Preview[]>(
        initialUrls.map((url): Preview => ({
            url,
            status: "done",
            showStatusIcon: false,
        }))
    );
    const [isUploading, setIsUploading] = useState(false);

    const uploadFiles = useCallback((acceptedFiles: File[]) => {
        if (!acceptedFiles.length) return;
        setIsUploading(true);

        const newPreviews: Preview[] = acceptedFiles.map((file) => ({
            url: URL.createObjectURL(file),
            status: "uploading",
            showStatusIcon: false,
        }));

        setPreviews((prev) => [...prev, ...newPreviews]);

        setTimeout(() => {
            setPreviews((prev) =>
                prev.map((preview) => {
                    if (newPreviews.find((n) => n.url === preview.url)) {
                        return {
                            ...preview,
                            status: "done",
                            showStatusIcon: true,
                        };
                    }
                    return preview;
                })
            );
            setIsUploading(false);
            onUploadSuccess(newPreviews.map((p) => p.url));
        }, 1500);
    }, [onUploadSuccess]);

    useEffect(() => {
        const timeouts = previews.map((preview, i) => {
            if (preview.showStatusIcon && preview.status !== "error") {
                return setTimeout(() => {
                    setPreviews((prev) => {
                        const copy = [...prev];
                        copy[i] = {...copy[i], showStatusIcon: false};
                        return copy;
                    });
                }, 7000);
            }
        });

        return () => {
            timeouts.forEach((t) => t && clearTimeout(t));
        };
    }, [previews]);

    return {previews, setPreviews, isUploading, uploadFiles};
};
