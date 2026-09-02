import { useRef, useState } from "react";
import { set, unset, useClient, type ObjectInputProps } from "sanity";
import { urlForImage } from "@/sanity/lib/image";

type ImageValue = {
  _type?: string;
  asset?: { _ref?: string; _type?: string };
  alt?: string;
};

export function InstantImageInput(props: ObjectInputProps) {
  const { value, onChange, readOnly } = props;
  const client = useClient({ apiVersion: "2024-01-01" });
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const image = (value || {}) as ImageValue;
  const preview = image.asset?._ref ? urlForImage(image as never) || "" : "";

  async function uploadFile(file: File) {
    if (readOnly) return;
    setError("");
    setUploading(true);
    try {
      const asset = await client.assets.upload("image", file, { filename: file.name });
      onChange(
        set({
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
          alt: image.alt || "",
        })
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        disabled={readOnly || uploading}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          const file = event.dataTransfer.files?.[0];
          if (file?.type.startsWith("image/")) void uploadFile(file);
        }}
        style={{
          position: "relative",
          width: "100%",
          minHeight: preview ? 220 : 140,
          border: "1px dashed var(--card-border-color, #cacaca)",
          borderRadius: 8,
          overflow: "hidden",
          background: "var(--card-bg-color, #fff)",
          cursor: readOnly ? "default" : "pointer",
          padding: 0,
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt={image.alt || "Uploaded image"}
            style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{ padding: 24, color: "var(--card-muted-fg-color, #6e6e6e)" }}>
            {uploading ? "Uploading…" : "Click or drop an image — it appears here as soon as it uploads"}
          </div>
        )}
        {uploading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
            }}
          >
            Uploading…
          </div>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (file) void uploadFile(file);
        }}
      />
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button
          type="button"
          disabled={readOnly || uploading}
          onClick={() => inputRef.current?.click()}
          style={{ padding: "6px 10px", borderRadius: 6, cursor: "pointer" }}
        >
          {preview ? "Replace image" : "Upload image"}
        </button>
        {preview && (
          <button
            type="button"
            disabled={readOnly || uploading}
            onClick={() => onChange(unset())}
            style={{ padding: "6px 10px", borderRadius: 6, cursor: "pointer" }}
          >
            Remove
          </button>
        )}
      </div>
      {error ? <p style={{ color: "#e22", marginTop: 8, fontSize: 13 }}>{error}</p> : null}
    </div>
  );
}
