import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CSSProperties, Fragment, ReactNode } from 'react'

import type { MainContentType, SidebarType } from '~/lib/sitemap'
import { checkIsExternal } from '~/lib/utils/router'

import s from './navigation.module.scss'

type ChildrenProps = {
  children: ReactNode
}

export const NavigationWrapper = ({ children }: ChildrenProps) => {
  return (
    <NavigationMenu.Root className={s.root} delayDuration={0}>
      {children}

      <div className={s.viewportWrapper}>
        <NavigationMenu.Viewport className={s.viewport} />
      </div>
    </NavigationMenu.Root>
  )
}

export const NavigationList = ({
  quantity,
  children
}: { quantity: number } & ChildrenProps) => {
  return (
    <div className={s.listWrapper}>
      <NavigationMenu.List
        className={s.list}
        style={{ '--links-quantity': quantity } as CSSProperties}
      >
        {children}
      </NavigationMenu.List>
    </div>
  )
}

export const NavigationItem = ({ children }: ChildrenProps) => {
  return (
    <NavigationMenu.Item className={s.itemList}>{children}</NavigationMenu.Item>
  )
}

export const NavigationTrigger = ({ children }: ChildrenProps) => {
  return <NavigationMenu.Trigger>{children}</NavigationMenu.Trigger>
}

export const NavigationContent = ({
  mainContent,
  sidebar,
  index,
  as: Comp = NavigationMenu.Content
}: {
  mainContent: MainContentType[]
  sidebar: SidebarType[]
  index: number
  as?: 'div' | typeof NavigationMenu.Content
}) => {
  const { asPath } = useRouter()

  return (
    <Comp className={clsx(s.content, s[`content-${index}`])}>
      <div className={s.mainContent}>
        {mainContent.map((item, index) => (
          <Fragment key={item.id}>
            {index !== 0 && <div className={s.divider} />}

            <div className={s.itemWrapper}>
              <div className={s.heading}>
                <div className={s.iconWrapper}>
                  <div className={s.grid}>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.8309 -6.9801L18.9239 -6.34611L19.0257 -5.65904L19.1386 -4.90796L19.2603 -4.08617L19.3953 -3.18262L19.5436 -2.18408L19.7096 -1.07952L19.8933 0.159827L20.1014 1.55596L20.336 3.13552L20.606 4.94257L20.9159 7.02577L21.2766 9.45581L21.7039 12.3277L22.2173 15.7739L22.8437 19.9713L23.6251 25.229L24.6299 31.9845M59.1739 31.9978H-27.185H59.1739ZM110.989 31.9978H59.1739L53.8619 25.2422L49.7273 19.9846L46.4183 15.7872L43.7025 12.3299L41.4427 9.45802L39.5325 7.02798L37.8946 4.94478L36.4737 3.13773L35.2297 1.55817L34.123 0.162038L33.147 -1.07731L32.2749 -2.18187L31.4892 -3.1804L30.7787 -4.08396L30.1323 -4.90575L29.5414 -5.65683L29.0013 -6.34389L28.5033 -6.97789H4.29126L3.77998 -6.34389L3.22443 -5.65683L2.61797 -4.90575L1.95396 -4.08396L1.22353 -3.1804L0.417863 -2.18187L-0.467484 -1.07731L-1.4679 0.162038L-2.59453 1.55817L-3.87162 3.13773L-5.33025 4.94478L-7.0124 7.02798L-8.97566 9.45802L-11.2931 12.3299L-14.0753 15.7762L-17.4728 19.9735L-21.718 25.2312L-27.174 31.9867H-78.9889L110.989 31.9978ZM111 31.9867L99.2293 25.2312H68.9814L63.1713 19.9735L58.5232 15.7762L54.7162 12.3299L51.5422 9.45802L48.8575 7.02798L46.5533 4.94478L44.5613 3.13773L42.8149 1.55817L41.2656 0.162038L39.8933 -1.07731L38.6671 -2.18187L37.5604 -3.1804H-4.83224L-5.95662 -2.18187L-7.20718 -1.07731L-8.6038 0.162038L-10.1753 1.55817L-11.946 3.13773L-13.9801 4.94478L-16.3285 7.02798L-19.0664 9.45802L-22.3001 12.3299L-26.178 15.7762L-30.919 19.9735L-36.8398 25.2312H-67.0854L-79 31.9867H111ZM82.722 15.7651H-50.39H82.722ZM93.7246 31.9978L84.1054 25.2422L76.6197 19.9846H-44.363L-51.9593 25.2422L-61.7202 31.9978H93.7246ZM-44.3077 12.3365H76.726H-44.3077ZM99.2249 25.2489L90.0615 19.9911H76.6197L70.6281 15.7938L65.7233 12.3476L61.6352 9.47571L58.1735 7.04567H-25.649L-29.1616 9.47571L-33.3116 12.3476L-38.2895 15.7938L-44.3696 19.9911H-57.8114L-67.0854 25.2489H99.2249ZM71.7149 9.46687H-39.2501H71.7149ZM76.4449 32L68.9814 25.2445H-36.8486L-44.456 32H76.4449ZM-31.2886 4.947H63.8442H-31.2886ZM90.0504 19.9868L82.7176 15.7894L76.7149 12.3432L71.7105 9.47129L67.4763 7.04125H58.1625L55.1965 4.95805L52.6246 3.15094L50.3736 1.57144L48.3815 0.175252L46.6109 -1.06404L45.0305 -2.16861L43.6074 -3.16714H37.5516L36.5511 -4.07069L35.6437 -4.89248L34.8136 -5.64356L34.0544 -6.33063H-1.26872L-2.0434 -5.64356L-2.8889 -4.89248L-3.8141 -4.07069L-4.83224 -3.16714H-10.8902L-12.3333 -2.16861L-13.9358 -1.06404L-15.7286 0.175252L-17.745 1.57144L-20.0292 3.15094L-22.6388 4.95805L-25.649 7.04125H-34.9628L-39.2501 9.47129L-44.3143 12.3432L-50.39 15.7894L-57.8114 19.9868H90.0504ZM-28.1014 3.13994H60.7012H-28.1014ZM57.9478 1.56038H-25.3147H57.9478ZM9.13633 -6.98231L8.82866 -6.34832L8.49225 -5.66125L8.12483 -4.91017L7.7242 -4.08838L7.28152 -3.18483L6.79238 -2.1863L6.25011 -1.08173L5.64365 0.157615L4.96192 1.55375L4.18945 3.13331L3.3041 4.94036L2.28375 7.02356L1.09738 9.4536L-0.305885 12.3255L-1.99026 15.7717L-4.04648 19.9691L-6.6162 25.2268L-9.91634 31.9823L9.13633 -6.98231ZM-22.8579 0.146559H55.5109H-22.8579ZM13.9792 -7L13.8707 -6.36595L13.7556 -5.67894L13.6273 -4.92781L13.4878 -4.10602L13.3329 -3.20252L13.1647 -2.20399L12.9765 -1.09942L12.7552 0.139925L12.5184 1.53611L12.2506 3.11562L11.9429 4.92267L11.5888 7.00592L11.1771 9.43596L10.6879 12.3078L10.1036 15.754L9.38644 19.9514L8.50109 25.2091L7.35236 31.9647L13.9792 -7ZM53.355 -1.07952H-20.6667H53.355ZM51.4206 -2.18408H-18.7145H51.4206ZM45.3581 -5.65904L44.1585 -6.34611L43.0518 -6.9801H33.3594L45.3581 -5.65904ZM49.6697 -3.18262L48.0939 -4.08617L46.6618 -4.90796L45.3537 -5.65904H40.0858L39.1076 -6.34611H34.0589L33.3594 -6.9801H28.5122L49.6697 -3.18262ZM67.4675 7.0324L63.8353 4.94921L60.6879 3.14215L57.9345 1.56259L55.4998 0.166406L53.3395 -1.07289L51.405 -2.17745L49.6653 -3.17598H43.6074L42.3214 -4.07954L41.1505 -4.90133L40.0814 -5.65241H-7.3112L-8.39576 -4.90133L-9.58212 -4.07954L-10.8902 -3.17598H-16.9438L-18.7145 -2.17745L-20.6733 -1.07289L-22.8601 0.166406L-25.3214 1.56259L-28.108 3.14215L-31.2953 4.94921L-34.9694 7.0324H67.4675ZM48.0983 -4.08617H-15.359L-16.9526 -3.18262L48.0983 -4.08617ZM46.6662 -4.90796H-13.9026L-15.3524 -4.08617L46.6662 -4.90796ZM4.29126 -6.9801H-5.40328L-6.3174 -6.34611L-7.3112 -5.65904H-12.579L-13.9071 -4.90796L4.29126 -6.9801ZM-0.560428 -6.9801L-1.27313 -6.34611H-11.3661L-12.579 -5.65904L-0.560428 -6.9801ZM-5.40328 -6.98452H-10.2483L-11.355 -6.35053L-5.40328 -6.98452ZM38.2244 -6.98452L39.1275 -6.35053H44.1739L38.2244 -6.98452ZM41.9119 31.9978L38.7534 25.2422L36.2944 19.9846L34.3267 15.7872L32.7154 12.3409L31.3741 9.46908L30.2364 7.03904L29.2625 4.95584L28.4192 3.14873L27.68 1.56923L27.016 0.17304L26.4382 -1.07952L25.9203 -2.18408L25.4533 -3.18262L25.0305 -4.08617L24.6454 -4.90796L24.2935 -5.65904L23.9726 -6.34611L23.676 -6.9801L41.9119 31.9978Z"
                        stroke="url(#paint0_linear_2608_89901)"
                        strokeOpacity="0.8"
                        strokeWidth="0.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_2608_89901"
                          x1="16"
                          y1="-7"
                          x2="16"
                          y2="32"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FAFAFA" stopOpacity="0.32" />
                          <stop offset="1" stopColor="#FAFAFA" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {item.icon}
                </div>
                <div>
                  <p className={s.title}>{item.title}</p>
                  <p className={s.subtitle}>{item.subtitle}</p>
                </div>
              </div>

              <ul className={s.list}>
                {item.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      className={clsx({
                        [s.active as string]: asPath === link.href
                      })}
                      href={link.href}
                      aria-label={`Go to ${link.label}`}
                    >
                      <span className={s.iconWrapper}>{link.icon}</span>

                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Fragment>
        ))}
      </div>

      <div className={clsx(s.divider, s.onlyMobile)} />

      <div className={s.sidebar}>
        {sidebar.map((item) => (
          <div className={s.item} key={item.id}>
            <p>{item.title}</p>
            <ul>
              {item.links.map((subitem) => (
                <Link
                  href={subitem.href}
                  aria-label={`Go to ${subitem.label}`}
                  key={subitem.label}
                >
                  {subitem.label}

                  {checkIsExternal(subitem.href) && (
                    <svg
                      width="12"
                      height="12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m3.34881 8.65164 5.3033-5.3033m0 0H3.87914m4.77297 0v4.77297"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Comp>
  )
}
