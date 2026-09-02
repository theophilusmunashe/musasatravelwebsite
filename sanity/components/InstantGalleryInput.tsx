import { useRef, useState } from "react";
import { set, useClient, type ArrayOfObjectsInputProps } from "sanity";
import { urlForImage } from "@/sanity/lib/image";
import { MAX_EXTRA_PHOTOS } from "@/lib/content-images";

type GalleryImage = {
  _key: string;
  _type?: string;
  asset?: { _ref?: string; _type?: string };
};

function makeKey() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export function InstantGalleryInput(props: ArrayOfObjectsInputProps) {
  const { value, onChange, readOnly } = props;
  const client = useClient({ apiVersion: "2024-01-01" });
  const inputRef = useRef<HTMLInputElement>(null);
  const items = (value || []) as GalleryImage[];
  const remaining = Math.max(0, MAX_EXTRA_PHOTOS - items.length);
  const [pending, setPending] = useState<string[]>([]);
  const [error, setError] = useState("");

  async function uploadFiles(files: File[]) {
    if (readOnly || remaining <= 0) return;
    const selected = files.filter((file) => file.type.startsWith("image/")).slice(0, remaining);
    if (!selected.length) return;
    setError("");
    const labels = selected.map((file) => file.name);
    setPending(labels);
    try {
      const uploaded: GalleryImage[] = [];
      for (const file of selected) {
        const asset = await client.assets.upload("image", file, { filename: file.name });
        uploaded.push({
          _type: "image",
          _key: makeKey(),
          asset: { _type: "reference", _ref: asset._id },
        });
      }
      onChange(set([...items, ...uploaded]));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setPending([]);
    }
  }

  function removeAt(key: string) {
    onChange(set(items.filter((item) => item._key !== key)));
  }

  return (
    <div>
      <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--card-muted-fg-color, #6e6e6e)" }}>
        Extra photos ({items.length}/{MAX_EXTRA_PHOTOS}). Drop files here — they show as soon as they upload. No extra
        close button.
      </p>
      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          void uploadFiles(Array.from(event.dataTransfer.files || []));
        }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: 10,
        }}
      >
        {items.map((item) => {
          const src = item.asset?._ref ? urlForImage(item as never) || "" : "";
          return (
            <div
              key={item._key}
              style={{
                position: "relative",
                borderRadius: 8,
                overflow: "hidden",
                border: "1px solid var(--card-border-color, #ddd)",
                minHeight: 110,
                background: "#111",
              }}
            >
              {src ? (
                <img src={src} alt="" style={{ width: "100%", height: 110, objectFit: "cover", display: "block" }} />
              ) : (
                <div style={{ height: 110 }} />
              )}
              <button
                type="button"
                disabled={readOnly}
                onClick={() => removeAt(item._key)}
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  border: 0,
                  borderRadius: 999,
                  background: "rgba(0,0,0,0.7)",
                  color: "#fff",
                  width: 24,
                  height: 24,
                  cursor: "pointer",
                }}
                aria-label="Remove photo"
              >
                ×
              </button>
            </div>
          );
        })}
        {pending.map((name) => (
          <div
            key={name}
            style={{
              borderRadius: 8,
              border: "1px dashed var(--card-border-color, #ddd)",
              minHeight: 110,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 8,
              fontSize: 12,
              textAlign: "center",
            }}
          >
            Uploading {name}…
          </div>
        ))}
        {remaining > 0 && !pending.length && (
          <button
            type="button"
            disabled={readOnly}
            onClick={() => inputRef.current?.click()}
            style={{
              minHeight: 110,
              borderRadius: 8,
              border: "1px dashed var(--card-border-color, #aaa)",
              background: "transparent",
              cursor: "pointer",
              fontSize: 13,
              padding: 8,
            }}
          >
            Add photos
            <div style={{ fontSize: 11, marginTop: 6, opacity: 0.7 }}>{remaining} left</div>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(event) => {
          const files = Array.from(event.target.files || []);
          event.target.value = "";
          void uploadFiles(files);
        }}
      />
      {error ? <p style={{ color: "#e22", marginTop: 8, fontSize: 13 }}>{error}</p> : null}
    </div>
  );
}
