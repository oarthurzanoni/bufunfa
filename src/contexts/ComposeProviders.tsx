interface ComposeProviderProps {
  with: Array<React.ElementType>;
  children: React.ReactNode;
}

export function ComposeProviders({
  with: Providers,
  children,
}: ComposeProviderProps) {
  return (
    <>
      {Providers.reduce(
        (AccProviders, Provider) => (
          <Provider>{AccProviders}</Provider>
        ),
        children
      )}
    </>
  );
}
