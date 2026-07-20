import { Container } from '~/components/Container'

export function ProductVideo() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-12 md:py-16">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-xl" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/1yKkDy313rM?mute=1"
              title="Replay QA product video"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
