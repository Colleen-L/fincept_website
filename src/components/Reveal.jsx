import { useInView } from '../hooks/useInView';

/**
 * Wraps content and plays an entrance the first time it scrolls into view.
 * variant: up | left | right | scale | wipe
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  threshold = 0.18,
  className = '',
  style,
  children,
  ...rest
}) {
  const [ref, inView] = useInView({ threshold });
  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--d': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
