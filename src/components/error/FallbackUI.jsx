// src/components/error/FallbackUI.jsx

export default function FallbackUI({ error, onRetry }) {
  return (
    <section className="error-fallback" role="alert">
      <div className="error-fallback__icon" aria-hidden="true">
        !
      </div>

      <h2>Something went wrong</h2>
      <p>
        This section could not be displayed. You can try loading it again.
      </p>

      <details>
        <summary>Technical details</summary>
        <pre>{error?.message || "Unknown error"}</pre>
      </details>

      <button
        type="button"
        className="button button--primary"
        onClick={onRetry}
      >
        Try Again
      </button>
    </section>
  );
}