export default function Image({ src, ...rest }) {
    src = 'http://localhost:4000/uploads/' + src;
    return (
        <img {...rest} src={src} alt={''} />
    );
}