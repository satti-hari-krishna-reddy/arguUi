import css from '../../styles/structure/container.module.scss';

export default function Container({ classProp, spacing, children }) {
  const _class = classProp ? classProp : '';

  return <div className={`${css.readingWidth} ${_class}`}>{children}</div>;
}
