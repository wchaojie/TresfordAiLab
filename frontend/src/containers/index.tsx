import { Container } from "unstated-next"
import UserContainer from "@/containers/UserContainer"
import RolesContainer from "@/containers/RolesContainer"

// ----------------------------------------------------------------------

const compose = (...containers: Container<any, void>[]) => {
  return (props: { children: any }) => {
    return containers.reduceRight((children, Container) => {
        return <Container.Provider>{children}</Container.Provider>
      }, props.children
    )
  }
}

export const Containers = compose(
  UserContainer, RolesContainer
)
